/* tslint:disable */
import { catalogItem } from './catalog-item';

export type NewCatalogItemResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? catalogItem
    : any
  : any;
