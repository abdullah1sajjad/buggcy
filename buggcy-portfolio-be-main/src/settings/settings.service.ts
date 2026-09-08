import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSetting } from './entities/site-setting.entity';
import type { UpdateSiteSettingDto } from './dto/site-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SiteSetting)
    private readonly settingsRepo: Repository<SiteSetting>,
  ) {}

  // Settings is a singleton: there is always exactly one row.
  // If it doesn't exist yet (fresh DB), create it on first read.
  async getSettings(): Promise<SiteSetting> {
    let settings = await this.settingsRepo.findOne({ where: {} });
    if (!settings) {
      settings = this.settingsRepo.create({});
      settings = await this.settingsRepo.save(settings);
    }
    return settings;
  }

  async updateSettings(dto: UpdateSiteSettingDto): Promise<SiteSetting> {
    const settings = await this.getSettings();
    Object.assign(settings, dto);
    return this.settingsRepo.save(settings);
  }
}