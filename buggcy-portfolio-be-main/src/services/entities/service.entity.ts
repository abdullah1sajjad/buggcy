import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceStat {
  label: string;
  value: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  secondaryImageUrl: string;

  @Column('simple-array', { nullable: true })
  features: string[];

  @Column('simple-array', { nullable: true })
  technologies: string[];

  @Column({ type: 'text', nullable: true })
  detailedContent: string;

  @Column({ type: 'jsonb', nullable: true })
  process: ProcessStep[];

  @Column({ type: 'jsonb', nullable: true })
  stats: ServiceStat[];

  @Column({ type: 'jsonb', nullable: true })
  whyChooseUs: WhyChooseUsItem[];

  @Column({ type: 'jsonb', nullable: true })
  faqs: ServiceFaq[];

  @Column('simple-array', { nullable: true })
  useCases: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
