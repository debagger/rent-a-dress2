/* tslint:disable */
import { User } from './user';

export type DeleteUserRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? User : any;
