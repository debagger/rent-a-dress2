/* tslint:disable */
export type UserLogoutResponse<
  TCode extends 200 | 404 = 200 | 404,
  TContentType extends 'text/plain' = 'text/plain'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    /**
     * If token found return User
     */
    ? string
    : any
  : TCode extends 404
  ? TContentType extends 'text/plain'
    /**
     * If token not found
     */
    ? string
    : any
  : any;
