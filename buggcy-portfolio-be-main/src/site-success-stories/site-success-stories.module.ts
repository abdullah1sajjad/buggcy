import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteSuccessStoriesService } from './site-success-stories.service';
import { SiteSuccessStoriesController } from './site-success-stories.controller';
import { SiteSuccessStory } from './entities/success-story.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteSuccessStory])],
  controllers: [SiteSuccessStoriesController],
  providers: [SiteSuccessStoriesService],
})
export class SiteSuccessStoriesModule {}
