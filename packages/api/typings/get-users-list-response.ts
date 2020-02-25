/* tslint:disable */
import { User } from './user';

export type GetUsersListResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    /**
     * Returns list of users
     */
    ? Array<User>
    : any
  : any;
