import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteServicesService } from './site-services.service';
import { SiteServicesController } from './site-services.controller';
import { SiteService } from './entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteService])],
  controllers: [SiteServicesController],
  providers: [SiteServicesService],
})
export class SiteServicesModule {}
