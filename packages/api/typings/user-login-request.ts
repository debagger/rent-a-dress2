/* tslint:disable */
export type UserLoginRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json'
  ? {
      username: string;
      password: string;
    }
  : any;
