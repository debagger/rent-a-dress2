/* tslint:disable */
import { catalogItem } from './catalog-item';

export type UpdateCatalogItemResponse<
  TCode extends 200 | 404 = 200 | 404,
  TContentType extends 'application/json' | 'text/plain' =
    | 'application/json'
    | 'text/plain'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? catalogItem
    : any
  : TCode extends 404
  ? TContentType extends 'text/plain'
    /**
     * Item not found
     */
    ? string
    : any
  : any;
