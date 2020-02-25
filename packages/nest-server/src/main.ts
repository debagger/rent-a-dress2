declare const module: any;
if (module.hot) {
  module.hot.accept();
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';


export async function bootstrap(nuxt) {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter(nuxt))
  await app.listen(3000);
  console.log(`Server starts`)


  return app;
}

//bootstrap();
