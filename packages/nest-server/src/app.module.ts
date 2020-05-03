import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as entities from './entity';
import { UsersService } from './users/users.service';
import { CatalogModule } from './catalog/catalog.module';
import { ImagesModule } from './images/images.module';
import { ConfigModule } from './config/config.module';

require('dotenv').config()

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH,
      entities: Object.values(entities),
      synchronize: true,
      keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature(Object.values(entities)),
    AuthModule,
    CatalogModule,
    ImagesModule,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports:[AuthModule, CatalogModule]
})
export class AppModule implements NestModule {
  constructor(private readonly users: UsersService) {}
  async configure() {
    let admin = await this.users.findOne({ username: 'admin' });
    if (!admin) {
      admin = await this.users.save({
        username: 'admin',
        email: 'debagger@gmail.com',
        role: 'admin',
        password: '123',
      });
    }
  }
}
