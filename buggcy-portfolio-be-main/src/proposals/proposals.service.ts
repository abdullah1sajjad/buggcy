import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from './entities/proposal.entity';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepo: Repository<Proposal>,
  ) {}

  async create(data: Partial<Proposal>): Promise<Proposal> {
    const proposal = this.proposalRepo.create(data);
    return this.proposalRepo.save(proposal);
  }

  findAll() {
    return this.proposalRepo.find({ relations: ['lead', 'template'] });
  }

  findOne(id: string) {
    return this.proposalRepo.findOne({ where: { id }, relations: ['lead', 'template'] });
  }

  async remove(id: string) {
    await this.proposalRepo.delete(id);
  }
}
