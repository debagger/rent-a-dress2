import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '../src/exception.filter';
import * as request from 'supertest';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { Image } from './../src/entity';
describe('Images test', () => {
  let app: INestApplication;
  let IMG_PATH: string;
  beforeEach(async () => {
    IMG_PATH = process.env.IMG_PATH;
    process.env.IMG_PATH = fs.mkdtempSync(path.join(os.tmpdir(), '/img_e2e_'));
    const testFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = testFixture.createNestApplication();
    await app.init();
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe());
  });

  afterEach(async () => {
    rimraf.sync(process.env.IMG_PATH);
    process.env.IMG_PATH = IMG_PATH;
  });

  it('Upload and save to correct directory structure', async () => {
    return request(app.getHttpServer())
      .post('/images/upload')
      .attach('file', './test/0.jpg')
      .expect(201)
      .expect(res => {
        const rootPath = process.env.IMG_PATH;
        const items: Image[] = res.body;
        const expectedDirs = ['full', 'big', 'medium', 'small'];
        expect(new Set(fs.readdirSync(process.env.IMG_PATH))).toEqual(
          new Set(expectedDirs),
        );
        expectedDirs.forEach(dir =>
          items.forEach(img => {
            const expectedPath = path.join(rootPath, dir, `${img.id}.jpg`);
            console.log(expectedPath);
            expect(fs.existsSync(expectedPath)).toBeTruthy();
          }),
        );
      });
  });

  it('Returns uploaded images', async () => {
    const server = app.getHttpServer();

    const file = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile('./test/0.jpg', (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    const res = await request(server)
      .post('/images/upload')
      .attach('file', './test/0.jpg');
    const id = res.body[0].id;
    return request(server)
      .get(`/images/full/${id}.jpg`)
      .expect(res => {
        expect((<Buffer>res.body).compare(file)).toBeTruthy();
      });
  });
});
