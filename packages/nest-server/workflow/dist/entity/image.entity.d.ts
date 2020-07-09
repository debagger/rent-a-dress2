import { ImageInterface } from './image.interface';
export declare class Image implements ImageInterface {
    id: number;
    imageName: string;
    hash: string;
    catalogItemId?: number;
    Width?: number;
    Height?: number;
}
