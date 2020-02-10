import { Token } from "./Token";
export declare class User {
    id: number;
    username: string;
    email: string;
    role: string;
    password: string;
    tokens: Token[];
}
