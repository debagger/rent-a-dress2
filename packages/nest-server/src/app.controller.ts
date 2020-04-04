import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  UseFilters,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';
import { UsersService } from './users/users.service';

@Controller()
@UseGuards(RoleGuard)
// @UseFilters(UnauthorizedExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UsersService
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

  @Post('auth/password')
  @Roles()
  async changePassword(
    @Request() req: any,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    const user = req.user.user;
    return await this.userService.changePassword(user, oldPassword, newPassword);
  }
}

