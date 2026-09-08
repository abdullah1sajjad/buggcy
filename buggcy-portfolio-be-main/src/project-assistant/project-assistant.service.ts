import { Injectable } from '@nestjs/common';
import { LeadsService, CreateLeadDto } from '../leads/leads.service';

@Injectable()
export class ProjectAssistantService {
  constructor(private readonly leadsService: LeadsService) {}

  async createEstimate(createLeadDto: CreateLeadDto) {
    // We store the lead so BD team can follow up, which also generates the proposal via LeadsService
    return this.leadsService.createLead(createLeadDto);
  }
}
