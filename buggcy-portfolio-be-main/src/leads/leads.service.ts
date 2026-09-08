import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead, LeadStatus } from './entities/lead.entity';
import { ProposalService } from '../ai/proposal.service';
import { MailService } from '../mail/mail.service';
import { ProposalsService } from '../proposals/proposals.service';
import * as path from 'path';
import * as fs from 'fs';

export interface CreateLeadDto {
  full_name: string;
  company_name: string;
  business_email: string;
  contact_number?: string;
  project_description: string;
  budget?: string;
  timeline?: string;
}

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    @InjectRepository(Lead)
    private readonly leadRepo: Repository<Lead>,
    private readonly proposalService: ProposalService,
    private readonly mailService: MailService,
    private readonly proposalsService: ProposalsService,
  ) { }

  async createLead(dto: CreateLeadDto) {
    // 1. Save Lead
    let lead = this.leadRepo.create(dto);
    lead = await this.leadRepo.save(lead);

    // Fire and forget the pipeline for MVP, or await it to return success.
    // For now we'll await so we know it worked.
    const proposal = await this.processLeadPipeline(lead);

    return { lead, proposal };
  }

  async processLeadPipeline(lead: Lead) {
    try {
      this.logger.log(`Starting Proposal Template pipeline for Lead ${lead.id}`);

      // 2. Generate Proposal Content, HTML, and PDF
      const meta = {
        companyName: 'Buggcy',
        clientCompanyName: lead.company_name || lead.full_name,
        clientContactName: lead.full_name,
        senderContactName: 'Buggcy AI Assistant',
        senderContactEmail: 'noreply@buggcy.com',
        senderContactPhone: '+1 800 000 0000',
        proposalDate: new Date().toLocaleDateString(),
        targetCompletionDate: lead.timeline || 'TBD',
      };

      // Ensure a directory exists to save the proposals locally
      const outputDir = path.join(process.cwd(), 'uploads', 'proposals');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const pdfFilename = `Proposal_${lead.company_name || lead.full_name}_${Date.now()}.pdf`.replace(/\s+/g, '_');
      const outputPath = path.join(outputDir, pdfFilename);

      const { content, pdfPath } = await this.proposalService.generateFullProposal(
        lead.project_description,
        meta,
        lead.budget,
        lead.timeline,
        outputPath
      );

      // 3. Save initial proposal to DB
      const proposal = await this.proposalsService.create({
        lead,
        ai_output_json: content,
        recommended_services: content.keyFeatures ? content.keyFeatures.map(f => f.name) : [],
        recommended_stack: content.recommendedStack ? content.recommendedStack.map(s => s.technology) : [],
        recommended_roles: content.estimatedTeam ? content.estimatedTeam.map(t => t.role) : [],
        estimated_timeline: content.estimatedTimeline,
        estimated_cost_min: content.estimatedCostMin,
        estimated_cost_max: content.estimatedCostMax,
        file_url: pdfFilename,
      });

      // 4. Email PDF to Client
      await this.mailService.sendMail({
        to: lead.business_email,
        subject: `Project Proposal Recommendation - ${lead.company_name || lead.full_name}`,
        html: `<p>Hi ${lead.full_name},</p><p>Thank you for reaching out to Buggcy! Please find attached our detailed project proposal based on your requirements.</p><p>Best regards,<br/>Buggcy Team</p>`,
        attachments: [
          {
            filename: `Proposal_${lead.company_name || lead.full_name}.pdf`,
            path: pdfPath,
          }
        ]
      });

      // 5. Update Lead Status
      lead.status = LeadStatus.SENT;
      await this.leadRepo.save(lead);

      this.logger.log(`Successfully completed template pipeline and sent email for Lead ${lead.id}`);

      return proposal;
    } catch (error) {
      this.logger.error(`Error processing lead pipeline for ${lead.id}`, error);
      return null;
    }
  }

  findAll() {
    return this.leadRepo.find({
      order: { created_at: 'DESC' },
      relations: ['proposals']
    });
  }

  findOne(id: string) {
    return this.leadRepo.findOne({ where: { id }, relations: ['proposals'] });
  }

  async remove(id: string) {
    const lead = await this.findOne(id);
    if (!lead) throw new NotFoundException('Lead not found');

    // Delete associated proposals manually to prevent foreign key constraint violations
    if (lead.proposals && lead.proposals.length > 0) {
      for (const proposal of lead.proposals) {
        await this.proposalsService.remove(proposal.id);
      }
    }

    await this.leadRepo.remove(lead);
    return { success: true };
  }
}
