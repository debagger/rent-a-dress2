import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { AppModule } from '../app.module';
import { ConfigModule } from '../config/config.module';

describe('Images Controller', () => {
  let controller: ImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers:[ConfigModule]
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
