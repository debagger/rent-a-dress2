/* tslint:disable */
export type DeleteImageResponse<
  TCode extends 204 = 204,
  TContentType extends 'text/plain' = 'text/plain'
> = TCode extends 204
  ? TContentType extends 'text/plain'
    /**
     * Image deleted
     */
    ? string
    : any
  : any;
