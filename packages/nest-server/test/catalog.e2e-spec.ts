import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { getRepository, DeepPartial } from 'typeorm';
import { catalogItem, User } from '../src/entity';
import * as request from 'supertest';
import { getAdminToken } from './getAdminToken';
import { UsersService } from '../src/users/users.service';
import { AuthService } from '../src/auth/auth.service';
import { AllExceptionsFilter } from '../src/exception.filter';
import { type } from 'os';

describe('Catalog API tests (e2e)', () => {
  let app: INestApplication;
  let userToken: string;
  beforeEach(async () => {
    const ModuleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = ModuleFixture.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const userService = app.get(UsersService);
    const authService = app.get(AuthService);

    const user = await userService.save(<DeepPartial<User>>{
      username: 'user',
      password: '123',
      role: 'user',
      email: '',
    });

    userToken = (await authService.login(user)).access_token;

    const db = getRepository(catalogItem);
    const items = [...Array(10).keys()].map(index => {
      return <Partial<catalogItem>>{
        caption: `Item ${index}`,
        desc: `Item description ${index}`,
        img: '',
        price: index * 1000,
      };
    });
    await db.save(items);
  });

  afterEach(async () => {
    await getRepository(catalogItem).clear();
    await getRepository(User).delete({ username: 'user' });
  });

  it('/catalog (GET)', async () => {
    const server = app.getHttpServer();
    return request(server)
      .get('/catalog')
      .expect(200)
      .expect(res => {
        expect(res.body.total).toBe(10);
        expect(res.body.data).toMatchSnapshot();
      });
  });

  it('/catalog (POST)', async () => {
    const server = app.getHttpServer();
    const token = await getAdminToken(server);
    return request(server)
      .post('/catalog')
      .auth(token, { type: 'bearer' })
      .send(<Partial<catalogItem>>{
        caption: 'New CatalogItem',
        img: '',
        desc: 'New CatalogItem description',
        price: 1000,
      })
      .expect(201, {
        id: 21,
        caption: 'New CatalogItem',
        img: '',
        desc: 'New CatalogItem description',
        price: 1000,
      });
  });

  it('/catalog (POST) using user token', async () => {
    const server = app.getHttpServer();

    return request(server)
      .post('/catalog')
      .auth(userToken, { type: 'bearer' })
      .send(<Partial<catalogItem>>{
        caption: 'New CatalogItem',
        img: '',
        desc: 'New CatalogItem description',
        price: 1000,
      })
      .expect(403);
  });

  it('/catalog (POST) no token', async () => {
    const server = app.getHttpServer();

    return request(server)
      .post('/catalog')
      .send(<Partial<catalogItem>>{
        caption: 'New CatalogItem',
        img: '',
        desc: 'New CatalogItem description',
        price: 1000,
      })
      .expect(401);
  });

  it('/catalog (POST) check validation', async () => {
    const server = app.getHttpServer();
    const token = await getAdminToken(server);

    return request(server)
      .post('/catalog')
      .auth(token, { type: 'bearer' })
      .send({
        caption: 'New CatalogItem',
        img: '',
        desc: 'New CatalogItem description',
        price: '1000 руб',
      })
      .expect(res => {
        expect(res.status).toBe(400);
        expect(res.body).toMatchSnapshot();
      });
  });
});
