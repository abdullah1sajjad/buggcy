import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteIndustriesService } from './site-industries.service';
import { SiteIndustriesController } from './site-industries.controller';
import { SiteIndustry } from './entities/industry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteIndustry])],
  controllers: [SiteIndustriesController],
  providers: [SiteIndustriesService],
})
export class SiteIndustriesModule {}
