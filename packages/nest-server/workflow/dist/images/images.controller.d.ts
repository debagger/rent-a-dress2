import { ImagesService } from './images.service';
import { UploadedFileInterface } from './uploaded-file.interface';
import { Image } from './../entity';
import { ImageDto } from './image.dto';
import { Response } from 'express';
import { ConfigInterface } from '../config/config.interface';
export declare class ImagesController {
    service: ImagesService;
    conf: ConfigInterface;
    constructor(service: ImagesService, conf: ConfigInterface);
    upload(file: UploadedFileInterface[]): Promise<(Image | Error)[]>;
    getImagesList(): Promise<ImageDto[]>;
    getImage(stringId: string, size: string, res: Response): Promise<void>;
}
