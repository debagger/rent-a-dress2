import { UserInterface } from '../entity';
export declare class CreateUserRequestDto implements UserInterface {
    id: number;
    username: string;
    email: string;
    role: string;
    password: string;
}
