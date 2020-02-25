/* tslint:disable */
import { User } from './user';

export type GetUserByTokenResponse<
  TCode extends 200 | 404 = 200 | 404,
  TContentType extends 'application/json' | 'text/plain' =
    | 'application/json'
    | 'text/plain'
> = TCode extends 200
  ? TContentType extends 'application/json'
    /**
     * If token found return User
     */
    ? {
        user?: User;
      }
    : any
  : TCode extends 404
  ? TContentType extends 'text/plain'
    /**
     * If token not found
     */
    ? string
    : any
  : any;
