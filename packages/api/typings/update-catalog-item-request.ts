/* tslint:disable */
import { catalogItem } from './catalog-item';

export type UpdateCatalogItemRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? catalogItem : any;