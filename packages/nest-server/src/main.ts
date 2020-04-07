declare const module: any;
if (module.hot) {
  module.hot.accept();
}

import { CrudConfigService } from '@nestjsx/crud';

CrudConfigService.load({
  query: {
    limit: 25,
    cache: 2000,
  },
  routes: {
    updateOneBase: {
      allowParamsOverride: true,
    },
    deleteOneBase: {
      returnDeleted: true,
    },
  },
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NotFoundExceptionFilter } from './notfound-exception.filter';
import { UnauthorizedExceptionFilter } from './unauthorized-exception.filter';
import { User, Token } from './entity';
import * as express from 'express';
import * as http from 'http';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exception.filter';

function startHttpRedirectServer() {
  const redirectExpressServer = express();
  redirectExpressServer.all('*', async (req, res, next) => {
    try {
      if (req) {
        const host = req.get('host');
        const originalUrl = req.originalUrl;
        if (host && originalUrl) {
          const httpsUrl = `https://${host}${originalUrl}`;
          console.log(`Redirect to ${httpsUrl}`);
          res.redirect(httpsUrl);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  });
  const httpRedirectServer = http
    .createServer(redirectExpressServer)
    .listen(80);
  return httpRedirectServer;
}

function configSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Rent-a-dress.ru API')
    .setDescription('API for rent-a-dress.ru')
    .setVersion('1.0')
    .addTag('dress')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [User, Token],
  });
  SwaggerModule.setup('api', app, document);
}

export async function bootstrap(nuxt) {
  const httpsOptions = {
    // key: fs.readFileSync('./../../../ssl/key.txt'),
    // cert: fs.readFileSync('./../../../ssl/www_rent_a_dress_ru_2020_07_10.crt'),
  };

  const app = await NestFactory.create(AppModule);

  if (nuxt) app.useGlobalFilters(new NotFoundExceptionFilter(nuxt));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({}));
  configSwagger(app);

  await app.listen(80);//443);

  // const httpRedirectServer = startHttpRedirectServer();

  console.log(`Server starts`);

  return {
    async close() {
      console.log('Closing http redirct server');
      await new Promise((resolve, reject) => {
        // httpRedirectServer.close(err => {
        //   if (err) return reject(err);
        //   resolve();
        // });
      });
      console.log('Http redirct server closed');

      console.log('Closing https server');
      await app.close();
      console.log('Https server closed');
    },
  };
}

//bootstrap();
