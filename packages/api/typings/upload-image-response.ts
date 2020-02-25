/* tslint:disable */
import { Image } from './image';

export type UploadImageResponse<
  TCode extends 200 | 404 = 200 | 404,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    /**
     * OK
     */
    ? Array<Image>
    : any
  : TCode extends 404
  ? TContentType extends 'application/json'
    /**
     * Item not found
     */
    ? null
    : any
  : any;
