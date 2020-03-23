import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as entities from './entity';
import { Repository } from 'typeorm';
import { User } from './entity';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: Object.values(entities),
      synchronize: true,
      keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature(Object.values(entities)),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly users: UsersService) {}
  async configure() {
    const admin = await this.users.findOne({ username: 'admin' });
    if (!admin) {
      const newAdmin = await this.users.save({
        username: 'admin',
        email: 'debagger@gmail.com',
        role: 'admin',
        password: '123',
      });
    }
  }
}
