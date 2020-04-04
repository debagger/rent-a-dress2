import { Test, TestingModule } from '@nestjs/testing';
import { CatalogController } from './catalog.controller';
import { AppModule } from '../app.module';

describe('CatalogItems Controller', () => {
  let controller: CatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<CatalogController>(CatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
