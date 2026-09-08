import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lead } from '../../leads/entities/lead.entity';
import { Template } from '../../templates/entities/template.entity';

@Entity('proposals')
export class Proposal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Lead, lead => lead.proposals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lead_id' })
  lead: Lead;

  @ManyToOne(() => Template, { nullable: true })
  @JoinColumn({ name: 'template_id' })
  template: Template;

  @Column('jsonb')
  ai_output_json: any;

  @Column('jsonb', { nullable: true })
  recommended_services: any;

  @Column('jsonb', { nullable: true })
  recommended_stack: any;

  @Column('jsonb', { nullable: true })
  recommended_roles: any;

  @Column({ nullable: true })
  estimated_timeline: string;

  @Column('decimal', { nullable: true })
  estimated_cost_min: number;

  @Column('decimal', { nullable: true })
  estimated_cost_max: number;

  @Column({ nullable: true })
  file_url: string;

  @Column({ default: 1 })
  version: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
