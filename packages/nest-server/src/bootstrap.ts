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
import { User, Token } from './entity';
import * as express from 'express';
import * as http from 'http';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exception.filter';
import { AuthService } from './auth/auth.service';
import { ConfigProvider } from './config/config.provider';
import { NuxtMiddleware } from './nuxt.middleware';
import { async } from 'rxjs/internal/scheduler/async';

require('dotenv').config();
const Configuration = ConfigProvider.useFactory();

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

async function bootstrap_https(nuxt) {
  const httpsOptions = {
    key: fs.readFileSync(Configuration.httpsKeyPath),
    cert: fs.readFileSync(Configuration.httpsCertPath),
  };

  const { app, port } = await startApp(httpsOptions, nuxt);
  console.log(`Server starts in http mode on port ${port}`);

  const httpRedirectServer = startHttpRedirectServer();

  console.log(`Server starts`);

  return {
    async close() {
      console.log('Closing http redirct server');
      await new Promise((resolve, reject) => {
        httpRedirectServer.close(err => {
          if (err) return reject(err);
          resolve();
        });
      });
      console.log('Http redirct server closed');

      console.log('Closing https server');
      await app.close();
      console.log('Https server closed');
    },
  };
}

async function startApp(
  httpsOptions?: { key: Buffer; cert: Buffer } | undefined,
  nuxt?: any,
) {
  const app = await NestFactory.create(AppModule, { httpsOptions });
  if (nuxt) app.useGlobalFilters(new NotFoundExceptionFilter(nuxt));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({}));
  configSwagger(app);
  const port = httpsOptions ? 443 : 80;
  await app.listen(port);
  return { app, port };
}

async function bootstrap_http(nuxt: any) {
  const { app, port } = await startApp((nuxt = nuxt));
  console.log(`Server starts in http mode on port ${port}`);
  return {
    async getAdminToken() {
      const auth = app.get(AuthService);
      const user = await auth.validateUser('admin', '123');
      const result = await auth.login(user);
      return result.access_token;
    },
    async close() {
      console.log('Closing http server');
      await app.close();
      console.log('Https server closed');
    },
  };
}

export async function bootstrap(nuxt) {
  return process.env.HTTP_MODE === 'https'
    ? bootstrap_https(nuxt)
    : bootstrap_http(nuxt);
}
