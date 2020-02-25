/* tslint:disable */
export type DeleteCatalogItemResponse<
  TCode extends 204 | 404 = 204 | 404,
  TContentType extends 'text/plain' = 'text/plain'
> = TCode extends 204
  ? TContentType extends 'text/plain'
    /**
     * CatalogItem deleted successfully
     */
    ? string
    : any
  : TCode extends 404
  ? TContentType extends 'text/plain'
    /**
     * id not found
     */
    ? string
    : any
  : any;
