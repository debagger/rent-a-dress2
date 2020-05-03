import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto {
    @ApiProperty({ isArray: true, type:String, format: 'binary' })
    file: any[];
  }
  