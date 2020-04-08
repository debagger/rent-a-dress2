import {
  Controller,
  UseGuards,
  UseInterceptors,
  Post,
  UploadedFile,
  Response,
} from '@nestjs/common';
import { RoleGuard } from '../auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Response as ExpressResponse } from 'express';

@Controller('images')
@UseGuards(RoleGuard)
export class ImagesController {
  constructor(public service: ImagesService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file, @Response()res: ExpressResponse) {
    res.statusCode = 500
    res.send("Test error");
    return res;
  }
}
