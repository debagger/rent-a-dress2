/* tslint:disable */
import { User } from './user';

export type UpdateUserRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? User : any;
