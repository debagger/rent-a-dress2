import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UnauthorizedExceptionFilter } from '../src/unauthorized-exception.filter';
import { getAdminToken } from './getAdminToken';

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
    const token = await getAdminToken(server);
    return request(server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200)
      .expect(res => {
        expect(res.body.payload).toBeDefined();
        expect(res.body.user).toBeDefined();
      });
  });

  it('/profile (wrong access token)', async () => {
    const server = app.getHttpServer();
    const res = await request(server)
      .post('/auth/login')
      .send({ username: 'admin', password: '123' });
    const token: string = 'wrong' + res.body.access_token + 'token';

    return request(server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(401);
  });

  
  it('/auth/password (POST) change password', async () => {
    const server = app.getHttpServer();
    const token = await getAdminToken(server);

    const newPasswordRes = await request(server)
      .post('/auth/password')
      .set('Authorization', `Bearer ${token}`)
      .send({ oldPassword: '123', newPassword: '1234' });
    expect(newPasswordRes.status).toBe(201);

    const oldPasswordLoginRes = await request(server)
      .post('/auth/login')
      .send({ username: 'admin', password: '123' });
    expect(oldPasswordLoginRes.status).toBe(401);

    const loginRes = await request(server)
      .post('/auth/login')
      .send({ username: 'admin', password: '1234' });
    expect(loginRes.status).toBe(201);
    expect(loginRes.body.access_token).toBeDefined();
    const newToken = loginRes.body.access_token;

    return request(server)
      .get('/profile')
      .set('Authorization', `Bearer ${newToken}`)
      .send()
      .expect(200)
      .expect(res => {
        expect(res.body.payload).toBeDefined();
        expect(res.body.user).toBeDefined();
        expect(res.body.user.username).toBe('admin');
      });
  });
});
