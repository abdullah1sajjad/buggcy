import { Test, TestingModule } from '@nestjs/testing';
import { CompanyDataController } from './company-data.controller';

describe('CompanyDataController', () => {
  let controller: CompanyDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyDataController],
    }).compile();

    controller = module.get<CompanyDataController>(CompanyDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
