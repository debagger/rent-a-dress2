import { Test, TestingModule } from '@nestjs/testing';
import { CatalogService } from './catalog.service';
import { AppModule } from '../app.module';

describe('CatalogItemsService', () => {
  let service: CatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    service = module.get<CatalogService>(CatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
