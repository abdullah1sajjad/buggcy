import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm'; // Changed: added In import
import { JobApplication } from './entities/job-application.entity';
import { Career, JobStatus } from '../careers/entities/career.entity';
import { ApplicationFieldType } from '../careers/types/application-form-field';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import type { CreateApplicationDto, UpdateApplicationStatusDto, ApplicationFilterDto } from './dto/application.dto';

// Added: shape of the paginated response returned by findAll
export interface PaginatedApplications {
  data: (JobApplication & { careerTitle: string | null })[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Added: pagination defaults/guardrails
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly applicationsRepo: Repository<JobApplication>,
    @InjectRepository(Career)
    private readonly careersRepo: Repository<Career>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async apply(
    careerId: string,
    dto: CreateApplicationDto,
    files: Express.Multer.File[],
  ): Promise<JobApplication> {
    const resumeFile = files.find((f) => f.fieldname === 'resume');
    if (!resumeFile) {
      throw new BadRequestException('A resume file (PDF or Word doc) is required');
    }

    const career = await this.careersRepo.findOne({ where: { id: careerId } });
    if (!career) throw new NotFoundException(`Career #${careerId} not found`);
    if (career.status !== JobStatus.OPEN) {
      throw new BadRequestException('This position is no longer accepting applications');
    }

    // Validate + collect answers to this career's custom Application Form
    // Builder fields. Non-file answers are read from dto.extraData.customFields
    // (a JSON object keyed by field id); file answers come from the
    // multipart `files` array, matched by fieldname === field.id.
    const customFieldsSchema = career.applicationFormSchema || [];
    const submittedCustomFields: Record<string, unknown> =
      (dto.extraData as Record<string, unknown> | undefined)?.customFields as
        | Record<string, unknown>
        | undefined ?? {};
    const customFields: Record<string, unknown> = { ...submittedCustomFields };
    const uploadedCustomFilePublicIds: string[] = [];

    try {
      for (const field of customFieldsSchema) {
        if (field.fieldType === ApplicationFieldType.FILE) {
          const file = files.find((f) => f.fieldname === field.id);
          if (field.required && !file) {
            throw new BadRequestException(`"${field.label}" is required`);
          }
          if (file) {
            const uploaded = await this.cloudinaryService.uploadBuffer(file.buffer, {
              folder: `careers/applications/${careerId}`,
              resourceType: 'raw',
              filename: file.originalname,
            });
            uploadedCustomFilePublicIds.push(uploaded.publicId);
            customFields[field.id] = {
              url: uploaded.url,
              publicId: uploaded.publicId,
              filename: file.originalname,
            };
          }
        } else {
          const value = customFields[field.id];
          const isEmpty =
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '');
          if (field.required && isEmpty) {
            throw new BadRequestException(`"${field.label}" is required`);
          }
        }
      }
    } catch (err) {
      // Roll back any custom files we already uploaded before failing.
      await Promise.all(
        uploadedCustomFilePublicIds.map((publicId) =>
          this.cloudinaryService.destroy(publicId, 'raw').catch(() => undefined),
        ),
      );
      throw err;
    }

    // Upload resume to Cloudinary as a raw asset (PDF/Word)
    const uploadResult = await this.cloudinaryService.uploadBuffer(resumeFile.buffer, {
      folder: `careers/resumes/${careerId}`,
      resourceType: 'raw',
      filename: resumeFile.originalname,
    });

    const extraData = {
      ...(dto.extraData || {}),
      customFields,
    };

    const application = this.applicationsRepo.create({
      careerId,
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      coverLetter: dto.coverLetter,
      linkedinUrl: dto.linkedinUrl || undefined,
      portfolioUrl: dto.portfolioUrl || undefined,
      extraData,
      resumeUrl: uploadResult.url,
      resumePublicId: uploadResult.publicId,
    });

    return this.applicationsRepo.save(application);
  }

  // Changed: return type is now Promise<PaginatedApplications> instead of a bare array
  async findAll(filters?: ApplicationFilterDto): Promise<PaginatedApplications> {
    // Added: read/normalize page & limit from filters, with sane defaults and a hard cap
    const page = Math.max(1, Number(filters?.page) || DEFAULT_PAGE);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, Number(filters?.limit) || DEFAULT_LIMIT),
    );

    const query = this.applicationsRepo.createQueryBuilder('application');

    if (filters?.search) {
      query.andWhere(
        '(application.fullName ILIKE :search OR application.email ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }
    if (filters?.careerId) query.andWhere('application.careerId = :careerId', { careerId: filters.careerId });
    if (filters?.status) query.andWhere('application.status = :status', { status: filters.status });

    // Changed: getMany() -> getManyAndCount() with skip/take for pagination
    const [applications, total] = await query
      .orderBy('application.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const data = await this.attachCareerTitles(applications);

    // Added: wrap paginated data + metadata into the response
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<JobApplication & { careerTitle: string | null }> {
    const application = await this.findRaw(id);
    const [withTitle] = await this.attachCareerTitles([application]);
    return withTitle;
  }

  async updateStatus(id: string, dto: UpdateApplicationStatusDto): Promise<JobApplication> {
    const application = await this.findRaw(id);
    application.status = dto.status;
    return this.applicationsRepo.save(application);
  }

  async remove(id: string): Promise<{ message: string }> {
    const application = await this.findRaw(id);
    // Clean up the resume from Cloudinary too
    await this.cloudinaryService.destroy(application.resumePublicId, 'raw');
    await this.applicationsRepo.remove(application);
    return { message: `Application #${id} deleted` };
  }

  private async findRaw(id: string): Promise<JobApplication> {
    const application = await this.applicationsRepo.findOne({ where: { id } });
    if (!application) throw new NotFoundException(`Application #${id} not found`);
    return application;
  }

  // Applications only store careerId (no DB relation), so batch-fetch the
  // matching career titles and attach them as `careerTitle` for display.
  private async attachCareerTitles(
    applications: JobApplication[],
  ): Promise<(JobApplication & { careerTitle: string | null })[]> {
    if (applications.length === 0) return [];

    const careerIds = [...new Set(applications.map((a) => a.careerId))];
    // Changed: careerIds.map((id) => ({ id })) -> In(careerIds)
    // Before: WHERE id = ? OR id = ? OR id = ? ... (one OR clause per id)
    // After:  WHERE id IN (?, ?, ?, ...)          (single, index-friendly IN clause)
    const careers = await this.careersRepo.find({ where: { id: In(careerIds) } });
    const titleById = new Map(careers.map((c) => [c.id, c.title]));

    return applications.map((application) => ({
      ...application,
      careerTitle: titleById.get(application.careerId) ?? null,
    }));
  }
}