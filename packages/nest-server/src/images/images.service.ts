import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '@rent-a-dress/entities';
import { UploadedFileInterface } from './uploaded-file.interface';
import * as sharp from 'sharp';
import { createHash } from 'crypto';
import path = require('path');
import * as fs from 'fs';
import { ConfigInterface } from '../config/config.interface';
import { ImageDto, ImageHrefs } from './image.dto';
import { ImageInterface } from '../entity/image.interface';

const thumbs: { sizename: string; size: number }[] = [
  { sizename: 'small', size: 320 },
  { sizename: 'medium', size: 640 },
  { sizename: 'big', size: 1024 },
];

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) public images: Repository<Image>,
    @Inject('CONFIG') conf: ConfigInterface,
  ) {
    this.dir = conf.imagePath;
    const fullDirPath = path.join(this.dir, 'full');
    if (!fs.existsSync(fullDirPath)) {
      fs.mkdirSync(fullDirPath, { recursive: true });
    }

    thumbs.forEach(s => {
      const thumbsPath = path.join(this.dir, s.sizename);
      if (!fs.existsSync(thumbsPath)) {
        fs.mkdirSync(thumbsPath, { recursive: true });
      }
    });
  }

  public dir: string;

  private getImageHash(file: UploadedFileInterface): string {
    const hash = createHash('md5');
    hash.update(file.buffer);
    return hash.digest('base64');
  }

  async saveImage(uploadedFile: UploadedFileInterface[]) {
    const result = uploadedFile.map(async file => {
      try {
        const metadata = await sharp(file.buffer).metadata();

        if (metadata.format !== 'jpeg') return new Error('Must be jpeg');

        const image = this.images.create({
          imageName: file.originalname,
          hash: this.getImageHash(file),
        });

        await this.images.save(image);

        const filePath = path.join(this.dir, 'full', `${image.id}.jpg`);
        const info = await sharp(file.buffer).toFile(filePath);
        image.Height = info.height;
        image.Width = info.width;

        await this.images.save(image);
        await this.saveThumbs(image, file);
        return image;
      } catch (err) {
        return Error(`
      Error when save image:
      ${err}
      `);
      }
    });
    return await Promise.all(result);
  }

  private async saveThumbs(image: Image, file: UploadedFileInterface) {
    for (const iterator of thumbs) {
      const thumbsFilePath = path.join(
        this.dir,
        iterator.sizename,
        `${image.id}.jpg`,
      );
      await sharp(file.buffer)
        .resize({
          width: iterator.size,
          height: iterator.size,
          fit: 'inside',
        })
        .jpeg({ quality: 50 })
        .toFile(thumbsFilePath);
    }
  }

  public async getImagesList() {
    const dbImages = await this.images.find();

    return dbImages.map((item: ImageInterface) => {
      const hrefs = new ImageHrefs();
      ['full', ...thumbs.map(item => item.sizename)].forEach(
        key =>
          (hrefs[key] = {
            href: `/images/${key}/${item.id}.jpg`,
            size:
              key === 'full'
                ? Math.max(item.Height, item.Width)
                : thumbs.find(t => t.sizename === key).size,
          }),
      );
      return <ImageDto>Object.assign(new ImageDto(), { ...item, hrefs });
    });
  }
  public async getImageById(id: number) {
    return await this.images.findOne({id});
  }
}
