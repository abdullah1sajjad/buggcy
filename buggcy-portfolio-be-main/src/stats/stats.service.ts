import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../blogs/entities/blog.entity';
import { Career } from '../careers/entities/career.entity';
import { SiteService } from '../site-services/entities/service.entity';
import { SiteIndustry } from '../site-industries/entities/industry.entity';
import { SiteSuccessStory } from '../site-success-stories/entities/success-story.entity';
import { ContactSubmission } from '../contact/entities/contact-submission.entity';
import { JobApplication } from '../applications/entities/job-application.entity';
import { Role } from '../common/enums/role.enum';

export interface AdminStats {
  blogs?: number;
  careers?: number;
  services?: number;
  industries?: number;
  successStories?: number;
  contacts?: number;
  applications?: number;
}

interface RequestUser {
  role: Role;
  permissions?: string[];
}

// Maps each togglable "module access" permission key (as assigned by an
// admin on the Users page) to the corresponding stats field.
const PERMISSION_TO_STAT_KEY: Record<string, keyof AdminStats> = {
  blogs: 'blogs',
  careers: 'careers',
  services: 'services',
  industries: 'industries',
  'success-stories': 'successStories',
  'contact-submissions': 'contacts',
  applications: 'applications',
};

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Blog) private readonly blogsRepo: Repository<Blog>,
    @InjectRepository(Career) private readonly careersRepo: Repository<Career>,
    @InjectRepository(SiteService) private readonly servicesRepo: Repository<SiteService>,
    @InjectRepository(SiteIndustry) private readonly industriesRepo: Repository<SiteIndustry>,
    @InjectRepository(SiteSuccessStory) private readonly storiesRepo: Repository<SiteSuccessStory>,
    @InjectRepository(ContactSubmission) private readonly contactsRepo: Repository<ContactSubmission>,
    @InjectRepository(JobApplication) private readonly applicationsRepo: Repository<JobApplication>,
  ) {}

  async getStats(user: RequestUser): Promise<AdminStats> {
    const [blogs, careers, services, industries, successStories, contacts, applications] =
      await Promise.all([
        this.blogsRepo.count(),
        this.careersRepo.count(),
        this.servicesRepo.count(),
        this.industriesRepo.count(),
        this.storiesRepo.count(),
        this.contactsRepo.count(),
        this.applicationsRepo.count(),
      ]);

    const full: Required<AdminStats> = {
      blogs,
      careers,
      services,
      industries,
      successStories,
      contacts,
      applications,
    };

    // Admins always see every stat. HR only sees stats for the modules an
    // admin has explicitly granted them — 2 granted permissions means 2
    // cards on the dashboard, 5 means 5, all means all.
    if (user.role === Role.ADMIN) return full;

    const allowed = new Set(user.permissions ?? []);
    const scoped: AdminStats = {};
    for (const [permissionKey, statKey] of Object.entries(PERMISSION_TO_STAT_KEY)) {
      if (allowed.has(permissionKey)) {
        scoped[statKey] = full[statKey];
      }
    }
    return scoped;
  }
}
