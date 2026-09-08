import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDataService } from './company-data.service';
import { CompanyDataController } from './company-data.controller';
import { CompanyData } from './entities/company-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyData])],
  controllers: [CompanyDataController],
  providers: [CompanyDataService],
  exports: [CompanyDataService],
})
export class CompanyDataModule {}
