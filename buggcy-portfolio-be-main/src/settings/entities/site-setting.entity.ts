import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from "typeorm";

@Entity("site_settings")
export class SiteSetting {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "Buggcy" })
  siteName: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  darkLogoUrl: string;

  @Column({ nullable: true })
  faviconUrl: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  secondaryPhone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  supportEmail: string;

  @Column({ nullable: true })
  workingHours: string;

  @Column({ nullable: true })
  officeTwoCity: string;

  @Column({ nullable: true })
  officeTwoCountry: string;

  @Column({ nullable: true })
  officeTwoAddress: string;

  @Column({ nullable: true })
  officeTwoPhone: string;

  @Column({ nullable: true })
  facebookUrl: string;

  @Column({ nullable: true })
  twitterUrl: string;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ nullable: true })
  instagramUrl: string;

  @Column({ nullable: true })
  youtubeUrl: string;

  @Column({ type: "text", nullable: true })
  metaDescription: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
