import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('site_industries')
export class SiteIndustry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  heroSubtitle: string;

  @Column({ nullable: true })
  heroCta: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column('text', { array: true, nullable: true })
  features: string[];

  @Column('text', { array: true, nullable: true })
  challenges: string[];

  @Column('text', { array: true, nullable: true })
  solutions: string[];

  @Column('text', { array: true, nullable: true })
  technologies: string[];

  @Column({ type: 'text', nullable: true })
  detailedContent: string;

  @Column('jsonb', { nullable: true })
  challengesDetailed: { title: string; description: string }[];

  @Column('jsonb', { nullable: true })
  lifecycle: { step: string; title: string; description: string }[];

  @Column('jsonb', { nullable: true })
  approach: { step: string; title: string; description: string }[];

  @Column('jsonb', { nullable: true })
  stats: { label: string; value: string }[];

  @Column('jsonb', { nullable: true })
  relatedServices: { title: string; href: string }[];

  @Column('jsonb', { nullable: true })
  testimonials: { quote: string; name: string; role: string; company: string; location?: string }[];

  @Column('jsonb', { nullable: true })
  successStories: { slug?: string; title: string; problem: string; solution: string; results: { label: string; value: string }[] }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
