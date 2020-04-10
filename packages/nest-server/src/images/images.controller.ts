import {
  Controller,
  UseGuards,
  UseInterceptors,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { RoleGuard } from '../auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
@UseGuards(RoleGuard)
export class ImagesController {
  constructor(public service: ImagesService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    // console.log(file);
  }
}
