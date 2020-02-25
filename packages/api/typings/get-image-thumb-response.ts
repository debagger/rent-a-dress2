/* tslint:disable */
export type GetImageThumbResponse<
  TCode extends 200 | 404 = 200 | 404,
  TContentType extends 'image/jpeg' | 'text/plain' = 'image/jpeg' | 'text/plain'
> = TCode extends 200
  ? TContentType extends 'image/jpeg'
    /**
     * Return image
     */
    ? string
    : any
  : TCode extends 404
  ? TContentType extends 'text/plain'
    /**
     * Image not found
     */
    ? string
    : any
  : any;
