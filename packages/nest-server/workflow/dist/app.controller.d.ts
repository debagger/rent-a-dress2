import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { loginResponse } from './login-response.dto';
export declare class changePasswordRequest {
    oldPassword: string;
    newPassword: string;
}
export declare class loginRequest {
    username: string;
    password: string;
}
export declare class AppController {
    private readonly appService;
    private readonly authService;
    private readonly userService;
    constructor(appService: AppService, authService: AuthService, userService: UsersService);
    login(req: any): Promise<loginResponse>;
    getProfile(req: any): any;
    changePassword(req: any, body: changePasswordRequest): Promise<boolean>;
}
