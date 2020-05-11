import {
  Controller,
  UseGuards,
  UseInterceptors,
  Post,
  UploadedFiles,
  Body,
  Get,
  Param,
  Res,
  Request,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { RoleGuard } from '../auth/roles.guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import {
  ApiConsumes,
  ApiBody,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UploadedFileInterface } from './uploaded-file.interface';
import { FileUploadDto } from './file-upload.dto';
import { Image } from './../entity';
import { MultipartRequestGuard } from './multipart-request.guard';
import { ExceptionResponse } from '../exception.filter';
import { ImageDto } from './image.dto';
import * as path from 'path';
import * as fs from 'fs';
import { Request as RequestExpress, Response } from 'express';
import { ConfigInterface } from '../config/config.interface';

@Controller('images')
@UseGuards(RoleGuard)
export class ImagesController {
  constructor(
    public service: ImagesService,
    @Inject('CONFIG') public conf: ConfigInterface,
  ) {}

  @Post('upload')
  @UseGuards(MultipartRequestGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of uploaded images',
    type: FileUploadDto,
  })
  @ApiCreatedResponse({
    description: 'Server image descripions',
    isArray: true,
    type: Image,
  })
  @ApiBadRequestResponse({
    description: 'Return if incorrect content type recieved',
    type: ExceptionResponse,
  })
  async upload(
    @UploadedFiles()
    file: UploadedFileInterface[],
  ) {
    return await this.service.saveImage(file);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all images from DB',
    isArray: true,
    type: ImageDto,
  })
  async getImagesList() {
    return await this.service.getImagesList();
  }

  @ApiNotFoundResponse({ description: 'Image not found on disk or in the DB' })
  @ApiOkResponse({ description: 'Return an image' })
  @Get(':size(full|big|medium|small)/:id(\\d+).jpg')
  async getImage(
    @Param('id') stringId: string,
    @Param('size') size: string,
    @Res() res: Response,
  ) {
    console.log({ stringId, size });
    const id = Number.parseInt(stringId);
    const image = await this.service.getImageById(id);

    if (!image) throw new NotFoundException('DB record not found');

    const imagePath = path.join(this.conf.imagePath, size, `${image.id}.jpg`);
    const exists = await new Promise<boolean>(resolve => {
      fs.exists(imagePath, resolve);
    });

    if (exists) return res.sendFile(imagePath);
    throw new NotFoundException('File not found');
  }
}
