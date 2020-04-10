import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '../entity';
import { IsEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserRequestDto implements UserInterface {
  @IsEmpty() id: number;

  @ApiProperty() @IsString() username: string;

  @ApiProperty() @IsEmail() email: string;

  @ApiProperty() @IsString() role: string;

  @ApiProperty() @IsString() password: string;
}
