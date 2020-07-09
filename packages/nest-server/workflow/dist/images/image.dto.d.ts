import { ImageInterface } from '../entity/image.interface';
export declare class ImageHref {
    size: number;
    href: string;
}
export declare class ImageHrefs {
    small: ImageHref;
    medium: ImageHref;
    big: ImageHref;
    full: ImageHref;
}
export declare class ImageDto implements ImageInterface {
    id: number;
    imageName: string;
    hash: string;
    catalogItemId?: number;
    Width?: number;
    Height?: number;
    hrefs: ImageHrefs;
}
