import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UnauthorizedExceptionFilter } from './../src/unauthorized-exception.filter';
import { getAdminToken } from './getAdminToken';
import { User } from './../src/entity';
import { createConnection, getConnection } from 'typeorm';

describe('User API tests (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new UnauthorizedExceptionFilter());
    await app.init();
    const db = getConnection().getRepository(User);
    const admin = await db.findOne({username: "admin"});
    admin.role = "admin";
    await db.save(admin);
  });

  afterEach(async ()=>{
      await app.close()
  })

  it('/users (GET) Correct auth', async () => {
    const server = app.getHttpServer();
    const token = await getAdminToken(server);
    return request(server)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/users (GET) No auth', async () => {
    const server = app.getHttpServer();
    return request(server)
      .get('/users')
      .expect(401);
  });

  it('/users (GET) Correct auth', async () => {
    const server = app.getHttpServer();
    const token = await getAdminToken(server);
    return request(server)
      .get('/users')
      .set('Authorization', `Bearer bad${token}token`)
      .expect(401);
  });

  it('/users (PATH)', async () => {
    const server = app.getHttpServer();
    const token = await getAdminToken(server);

    expect(
      (
        await request(server)
          .get('/users')
          .set('Authorization', `Bearer ${token}`)
          .send()
      ).status,
    ).toBe(200);

    const res = await request(server)
      .patch('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ role: 'user' });

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.role).toBe('user');

    return request(server)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
  });
  
  it('/users (POST)', async () => {
    const server = app.getHttpServer();
    const token = await getAdminToken(server);
    const newUser: Partial<User> = {
      email: 'user1@mail.ru',
      password: '123',
      role: 'user',
      username: 'user1',
    };

    return request(server)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
      .expect(201, {
        id: 2,
        username: 'user1',
        email: 'user1@mail.ru',
        role: 'user',
      });
  });
});
