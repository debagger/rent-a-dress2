import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthGuard, IAuthGuard, Type } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthModule } from './auth.module';
import { bootstrap } from 'src/main';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;
    const result = super.canActivate(context);
    if (roles.length == 0) return result;
    if (result instanceof Promise) {
      return (<Promise<boolean>>result).then(res => {
        if (res) {
          const userRole = context.switchToHttp().getRequest().user?.user?.role;
          const isUserInRole = !!roles.find(item => item === userRole);
          return isUserInRole;
        }
      });
    }
    return result;
  }
}
