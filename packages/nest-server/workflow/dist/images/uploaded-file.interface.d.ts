/// <reference types="node" />
export interface UploadedFileInterface {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: 'image/jpeg';
    buffer: Buffer;
    size: number;
}
