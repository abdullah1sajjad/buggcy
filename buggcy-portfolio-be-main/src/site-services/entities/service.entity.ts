import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('site_services')
export class SiteService {
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

  @Column('text', { array: true, nullable: true })
  features: string[];

  @Column('text', { array: true, nullable: true })
  technologies: string[];

  @Column({ type: 'text', nullable: true })
  detailedContent: string;

  @Column('jsonb', { nullable: true })
  process: { step: string; title: string; description: string }[];

  @Column('jsonb', { nullable: true })
  stats: { label: string; value: string }[];

  @Column('jsonb', { nullable: true })
  whyChooseUs: { title: string; description: string }[];

  @Column('jsonb', { nullable: true })
  faqs: { question: string; answer: string }[];

  @Column('text', { array: true, nullable: true })
  useCases: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
