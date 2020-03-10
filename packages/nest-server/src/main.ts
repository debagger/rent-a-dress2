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
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
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
// import { AllExceptionsFilter } from './exception.filter';

export async function bootstrap(nuxt) {
  NestFactory.create;
  const app = await NestFactory.create(AppModule);

  if (nuxt) app.useGlobalFilters(new NotFoundExceptionFilter(nuxt));

  const options = new DocumentBuilder()
    .setTitle('Rent-a-dress.ru API')
    .setDescription('API for rent-a-dress.ru')
    .setVersion('1.0')
    .addTag('dress')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [User, Token],
  });
  console.log(document.components.schemas);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Server starts`);

  return app;
}

//bootstrap();
