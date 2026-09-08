import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum BlogStatus {
  DRAFT     = 'draft',
  PUBLISHED = 'published',
  ARCHIVED  = 'archived',
}

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  excerpt: string;

  @Column({ type: 'text' })
  content: string; // rich text / HTML

  @Column({ nullable: true })
  coverImage: string; // URL

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column()
  category: string;

  @Column({ type: 'enum', enum: BlogStatus, default: BlogStatus.DRAFT })
  status: BlogStatus;

  @Column({ nullable: true })
  publishedAt: Date;

  @Column({ default: 0 })
  readTimeMinutes: number;

  // ── Author (FK to users) ─────────────────────
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column({ nullable: true })
  authorId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
