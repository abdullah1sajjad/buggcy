import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum CompanyDataCategory {
  SERVICE = 'service',
  TECH_STACK = 'tech_stack',
  ROLE = 'role',
  CASE_STUDY = 'case_study',
  PRICING_RULE = 'pricing_rule',
  GENERAL = 'general'
}

@Entity('company_data')
export class CompanyData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CompanyDataCategory,
    default: CompanyDataCategory.GENERAL,
  })
  category: CompanyDataCategory;

  @Column('text')
  description: string;

  @Column('jsonb', { nullable: true })
  metadata: any; // tags, indicative_rate, etc.

  // gemini-embedding-2 produces 3072-dimensional vectors
  @Column({
    type: 'vector',
    length: 3072,
    nullable: true,
  })
  embedding: number[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
