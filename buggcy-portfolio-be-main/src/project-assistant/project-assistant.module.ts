import { Module } from '@nestjs/common';
import { ProjectAssistantController } from './project-assistant.controller';
import { ProjectAssistantService } from './project-assistant.service';
import { LeadsModule } from '../leads/leads.module';

@Module({
  imports: [LeadsModule],
  controllers: [ProjectAssistantController],
  providers: [ProjectAssistantService],
})
export class ProjectAssistantModule {}
