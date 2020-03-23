import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';

@Controller()
@UseGuards(RoleGuard)
// @UseFilters(UnauthorizedExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req): Promise<{ access_token: String }> {
    return await this.authService.login(req.user);
  }

  @Roles()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
