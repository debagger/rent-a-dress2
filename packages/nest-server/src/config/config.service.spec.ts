import { Test, TestingModule } from '@nestjs/testing';
import { ConfigProvider } from './config.provider';
import { ConfigInterface } from './config.interface';
import { ConfigModule } from './config.module';

describe('ConfigService', () => {
  let conf: ConfigInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[ConfigModule]
    }).compile();
    conf = module.get('CONFIG');
  });

  it('should be defined', () => {
    expect(conf).toBeDefined();
  });
});
