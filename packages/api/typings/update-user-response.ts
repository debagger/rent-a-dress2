/* tslint:disable */
import { User } from './user';

export type UpdateUserResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? User
    : any
  : any;
