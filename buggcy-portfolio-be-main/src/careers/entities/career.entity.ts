import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { ApplicationFormField } from '../types/application-form-field';

export enum JobType {
  FULL_TIME  = 'full_time',
  PART_TIME  = 'part_time',
  CONTRACT   = 'contract',
  INTERNSHIP = 'internship',
  REMOTE     = 'remote',
}

export enum JobStatus {
  OPEN   = 'open',
  CLOSED = 'closed',
  DRAFT  = 'draft',
}

@Entity('careers')
export class Career {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  department: string;

  @Column()
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  requirements: string;

  @Column({ type: 'text', nullable: true })
  responsibilities: string;

  @Column({ type: 'enum', enum: JobType, default: JobType.FULL_TIME })
  jobType: JobType;

  @Column({ type: 'enum', enum: JobStatus, default: JobStatus.DRAFT })
  status: JobStatus;

  @Column({ nullable: true })
  salaryRange: string;

  @Column({ nullable: true })
  salaryCurrency: string;

  @Column({ nullable: true })
  deadline: Date;

  // Job-specific custom application fields, designed by Admin/HR in the
  // "Application Form Builder". Rendered by the public apply page in
  // addition to the fixed fields (name, email, phone, resume, cover letter).
  @Column({ type: 'jsonb', default: [] })
  applicationFormSchema: ApplicationFormField[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
