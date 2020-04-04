import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { UnauthorizedExceptionFilter } from '../src/unauthorized-exception.filter';
import { getRepository } from 'typeorm';
import { catalogItem } from '../src/entity';
import * as request from "supertest";

describe('Catalog API tests (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const ModuleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = ModuleFixture.createNestApplication();
    app.useGlobalFilters(new UnauthorizedExceptionFilter());
    await app.init();
    const db = getRepository(catalogItem);
    const items = Array(10).map(
      (v, index) =>
        <Partial<catalogItem>>{
          caption: `Item ${index}`,
          desc: `Item description ${index}`,
          price: index * 1000,
        },
    );
    db.save(items);
  });

  afterEach(async () => {
    const db = getRepository(catalogItem);
    db.clear();
  });

  it("/catalog (GET)", async()=>{
      const server = app.getHttpServer();
      return request(server).get("/catalog").expect(200);
  })
});
