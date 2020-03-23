import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UnauthorizedExceptionFilter } from '../src/unauthorized-exception.filter';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new UnauthorizedExceptionFilter());
    await app.init();
  });

  it('/auth/login (correct)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: '123' })
      .expect(201)
      .expect(res => {
        res.body.access_token;
      });
  });

  it('/auth/login (wrong pass)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: 'wrong' })
      .expect(401)
      .expect(res => {
        res.body.access_token;
      });
  });

  it('/profile', async () => {
    const server = app.getHttpServer();
    const res = await request(server)
      .post('/auth/login')
      .send({ username: 'admin', password: '123' });
    const token = res.body.access_token;
    return request(server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200)
      .expect(res => {
        expect(res.body.payload).toBeDefined();
        expect(res.body.user).toBeDefined();
      });
  }, 30000);
  it('/profile (wrong access token)', async () => {
    const server = app.getHttpServer();
    const res = await request(server)
      .post('/auth/login')
      .send({ username: 'admin', password: '123' });
    const token: string = 'abc' + res.body.access_token + 'defg';

    return request(server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(401);
  }, 30000);
});
