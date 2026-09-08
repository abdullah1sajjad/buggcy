import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { SiteSetting } from './entities/site-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteSetting])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}