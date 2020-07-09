import { ExecutionContext } from '@nestjs/common';
import { IAuthGuard, Type } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
declare const RoleGuard_base: Type<IAuthGuard>;
export declare class RoleGuard extends RoleGuard_base {
    private readonly reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export {};
