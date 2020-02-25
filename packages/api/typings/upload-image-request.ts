/* tslint:disable */
export type UploadImageRequest<
  TCode extends 'multipart/form-data' = 'multipart/form-data'
> = TCode extends 'multipart/form-data'
  ? {
      files?: Array<{
        [key: string]: any;
      }>;
      itemId?: number;
    }
  : any;
