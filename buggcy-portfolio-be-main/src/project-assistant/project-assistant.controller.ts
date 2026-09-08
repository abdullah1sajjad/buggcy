import { Controller, Post, Body } from '@nestjs/common';
import { ProjectAssistantService } from './project-assistant.service';
import { CreateLeadDto } from '../leads/leads.service';

@Controller('project-assistant')
export class ProjectAssistantController {
  constructor(private readonly projectAssistantService: ProjectAssistantService) {}

  @Post('estimate')
  createEstimate(@Body() createLeadDto: CreateLeadDto) {
    return this.projectAssistantService.createEstimate(createLeadDto);
  }
}
