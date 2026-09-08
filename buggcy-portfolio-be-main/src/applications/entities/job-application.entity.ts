import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

export enum ApplicationStatus {
  PENDING    = 'pending',
  REVIEWING  = 'reviewing',
  SHORTLISTED = 'shortlisted',
  REJECTED   = 'rejected',
  HIRED      = 'hired',
}

@Entity('job_applications')
export class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  careerId: string; // FK -> careers.id

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  coverLetter: string;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ nullable: true })
  portfolioUrl: string;

  // Optional rich profile data (education, experience, skills, links, etc.)
  // captured from the detailed multi-step application form on the website.
  @Column({ type: 'jsonb', nullable: true })
  extraData: Record<string, unknown>;

  // Cloudinary data for the uploaded resume (PDF/Word)
  @Column()
  resumeUrl: string;

  @Column()
  resumePublicId: string;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.PENDING })
  status: ApplicationStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
