import { Repository } from 'typeorm';
import { Image } from '../entity';
import { UploadedFileInterface } from './uploaded-file.interface';
import { ConfigInterface } from '../config/config.interface';
import { ImageDto } from './image.dto';
export declare class ImagesService {
    images: Repository<Image>;
    constructor(images: Repository<Image>, conf: ConfigInterface);
    dir: string;
    private getImageHash;
    saveImage(uploadedFile: UploadedFileInterface[]): Promise<(Image | Error)[]>;
    private saveThumbs;
    getImagesList(): Promise<ImageDto[]>;
    getImageById(id: number): Promise<Image>;
}
