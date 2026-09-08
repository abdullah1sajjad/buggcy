import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalsService } from './proposals.service';
import { DocumentService } from './document.service';
import { Proposal } from './entities/proposal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proposal])],
  providers: [ProposalsService, DocumentService],
  exports: [ProposalsService, DocumentService],
})
export class ProposalsModule {}
