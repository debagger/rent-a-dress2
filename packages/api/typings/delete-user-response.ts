/* tslint:disable */
export type DeleteUserResponse<
  TCode extends 204 = 204,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 204
  ? TContentType extends 'application/json'
    /**
     * User deleted
     */
    ? null
    : any
  : any;
