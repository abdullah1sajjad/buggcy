import { Controller, Get, Post, Body, Param, Res, NotFoundException, Delete } from '@nestjs/common';
import { LeadsService, CreateLeadDto } from './leads.service';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.createLead(createLeadDto);
  }

  @Get()
  findAll() {
    return this.leadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Get(':id/proposal-document')
  async downloadProposal(@Param('id') id: string, @Res() res: Response) {
    const lead = await this.leadsService.findOne(id);
    if (!lead || !lead.proposals || lead.proposals.length === 0) {
      throw new NotFoundException('Proposal not found for this lead');
    }
    
    const proposal = lead.proposals[0];
    if (!proposal.file_url) {
      throw new NotFoundException('Proposal document not found');
    }

    const filePath = path.join(process.cwd(), 'uploads', 'proposals', proposal.file_url);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found on server');
    }

    res.download(filePath, proposal.file_url);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadsService.remove(id);
  }
}
