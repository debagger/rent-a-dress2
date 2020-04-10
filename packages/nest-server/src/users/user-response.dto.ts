import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from "class-transformer";
import { UserInterface } from '../entity';

export class UserResponse implements UserInterface {
  @ApiProperty({description:"Id"})
  id: number;
  @ApiPropertyOptional({description:"Username"})
  username: string;
  @ApiPropertyOptional({description:"Email"})
  email: string;
  @ApiPropertyOptional({description:"User role"})
  role: string;
  @Exclude()
  password: string;
}
