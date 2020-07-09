import { Token } from './token.entity';
import { UserInterface } from './user.interface';
export declare class User implements UserInterface {
    id: number;
    username: string;
    email: string;
    role: string;
    password: string;
    tokens: Token[];
}
