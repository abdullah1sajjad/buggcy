import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiService } from './ai.service';
import { CompanyData } from '../company-data/entities/company-data.entity';
import { ConfigModule } from '@nestjs/config';

import { ProposalService } from './proposal.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyData]),
    ConfigModule,
  ],
  providers: [AiService, ProposalService],
  exports: [AiService, ProposalService],
})
export class AiModule {}
