import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '../src/exception.filter';
import * as request from 'supertest';

describe('Images test', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const testFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = testFixture.createNestApplication();
    await app.init();
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe());
  });
  it('upload', async () => {
    return request(app.getHttpServer())
      .post('/images/upload')
      .attach('file', './test/0.jpg')
      .expect(500);
  });
});
