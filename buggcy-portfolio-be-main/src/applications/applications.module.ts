import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { JobApplication } from './entities/job-application.entity';
import { Career } from '../careers/entities/career.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication, Career])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
