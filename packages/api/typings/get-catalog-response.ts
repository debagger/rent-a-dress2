/* tslint:disable */
import { catalogItem } from './catalog-item';

export type GetCatalogResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    /**
     * Return all items from catalog
     */
    ? Array<catalogItem>
    : any
  : any;
