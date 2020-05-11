import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { ImageInterface } from '../entity/image.interface';

export class ImageHref {
  @ApiProperty() size: number;
  @ApiProperty() href: string;
}

export class ImageHrefs {
  @ApiProperty() public small: ImageHref;
  @ApiProperty() public medium: ImageHref;
  @ApiProperty() public big: ImageHref;
  @ApiProperty() public full: ImageHref;
}

export class ImageDto implements ImageInterface {
  @IsInt() @ApiProperty() id: number;
  @IsString() @ApiProperty() imageName: String;
  @IsString() @ApiProperty() hash: String;
  @IsInt() @ApiPropertyOptional() catalogItemId?: number;
  @IsInt() @ApiPropertyOptional() Width?: number;
  @IsInt() @ApiPropertyOptional() Height?: number;
  @ApiProperty() hrefs: ImageHrefs;
}
