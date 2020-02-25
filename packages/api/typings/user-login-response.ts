/* tslint:disable */
export type UserLoginResponse<
  TCode extends 200 | 404 = 200 | 404,
  TContentType extends 'application/json' | 'text/plain' =
    | 'application/json'
    | 'text/plain'
> = TCode extends 200
  ? TContentType extends 'application/json'
    /**
     * If login accepted return token
     */
    ? {
        token?: string;
      }
    : any
  : TCode extends 404
  ? TContentType extends 'text/plain'
    /**
     * User not found or password incorrect
     */
    ? string
    : any
  : any;
