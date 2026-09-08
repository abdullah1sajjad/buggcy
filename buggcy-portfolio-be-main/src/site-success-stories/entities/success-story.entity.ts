import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('site_success_stories')
export class SiteSuccessStory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  client: string;

  @Column()
  category: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  problem: string;

  @Column({ type: 'text' })
  solution: string;

  @Column('jsonb', { nullable: true })
  results: { label: string; value: string }[];

  @Column('text', { array: true, nullable: true })
  technologies: string[];

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  laptopImageUrl: string;

  @Column({ nullable: true })
  mobileImageUrl: string;

  @Column({ nullable: true })
  tabletImageUrl: string;

  @Column({ nullable: true })
  desktopImageUrl: string;

  @Column({ nullable: true })
  liveUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
