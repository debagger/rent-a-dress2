/* tslint:disable */
import { Image } from './image';

export type GetImagesForCatalogItemResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    /**
     * Return imagelist for catalogItem id
     */
    ? Array<Image>
    : any
  : any;
