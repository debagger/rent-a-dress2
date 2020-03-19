import { Controller, Get, UseGuards, Post, Request, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';
@Controller()
@UseGuards(RoleGuard)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  // @Get()
  // async getHello(): Promise<string> {
  //   return this.appService.getHello();
  // }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req): Promise<{ access_token: String }> {
    return this.authService.login(req.user);
  }

  @Roles()
  @Get('profile')
  async getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
