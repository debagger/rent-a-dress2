import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  UseFilters,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';
import { UsersService } from './users/users.service';
import { ApiUnauthorizedResponse, ApiParam, ApiBody, ApiProperty, ApiRequestTimeoutResponse, ApiResponse, ApiBearerAuth, ApiBadRequestResponse } from '@nestjs/swagger';

export class changePasswordRequest {
  @ApiProperty() oldPassword: string;
  @ApiProperty() newPassword: string;
};

export class loginRequest {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
}

export class loginResponse {
  @ApiProperty() access_token: string
}

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
  @ApiUnauthorizedResponse({description:"Wrong creditionals recieved"})
  @ApiBody({type: [loginRequest]})
  @ApiResponse({status: 201, type: loginResponse})
  async login(@Request() req): Promise<loginResponse> {
    return await this.authService.login(req.user);
  }

  @Roles()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/password')
  @ApiBadRequestResponse({description: "Operation failed"})
  @Roles()
  async changePassword(
    @Request() req: any,
    @Body() body: changePasswordRequest,
  ) {
    const user = req.user.user;
    return this.userService.changePassword(user, body.oldPassword, body.newPassword);
  }
}
