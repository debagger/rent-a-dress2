import {
  Controller,
  UseGuards,
  UseInterceptors,
  Post,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { RoleGuard } from '../auth/roles.guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import {
  ApiConsumes,
  ApiBody,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UploadedFileInterface } from './uploaded-file.interface';
import { FileUploadDto } from './file-upload.dto';
import { Image } from './../entity';
import { from } from 'rxjs';
import { MultipartRequestGuard } from './multipart-request.guard';
import { ExceptionResponse } from '../exception.filter';

@Controller('images')
@UseGuards(RoleGuard)
export class ImagesController {
  constructor(public service: ImagesService) {}
  @Post('upload')
  @UseGuards(MultipartRequestGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of uploaded images',
    type: FileUploadDto
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
}
