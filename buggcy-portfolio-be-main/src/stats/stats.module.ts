import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Blog } from '../blogs/entities/blog.entity';
import { Career } from '../careers/entities/career.entity';
import { SiteService } from '../site-services/entities/service.entity';
import { SiteIndustry } from '../site-industries/entities/industry.entity';
import { SiteSuccessStory } from '../site-success-stories/entities/success-story.entity';
import { ContactSubmission } from '../contact/entities/contact-submission.entity';
import { JobApplication } from '../applications/entities/job-application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Blog,
      Career,
      SiteService,
      SiteIndustry,
      SiteSuccessStory,
      ContactSubmission,
      JobApplication,
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
