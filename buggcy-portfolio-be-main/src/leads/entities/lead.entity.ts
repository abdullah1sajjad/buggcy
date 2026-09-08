import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Proposal } from '../../proposals/entities/proposal.entity';

export enum LeadStatus {
  NEW = 'new',
  REVIEWED = 'reviewed',
  SENT = 'sent',
  CONTACTED = 'contacted',
  WON = 'won',
  LOST = 'lost'
}

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column()
  company_name: string;

  @Column()
  business_email: string;

  @Column({ nullable: true })
  contact_number: string;

  @Column('text')
  project_description: string;

  @Column({ nullable: true })
  budget: string;

  @Column({ nullable: true })
  timeline: string;

  @Column({
    type: 'enum',
    enum: LeadStatus,
    default: LeadStatus.NEW,
  })
  status: LeadStatus;

  @Column({ type: 'uuid', nullable: true })
  assigned_to: string; // Ideally a relation to User entity

  @OneToMany(() => Proposal, proposal => proposal.lead)
  proposals: Proposal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
