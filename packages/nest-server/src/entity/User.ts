import { IsInt, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Token } from './Token';

@Entity()
export class User {
  @PrimaryGeneratedColumn() @IsInt() @ApiProperty() id: number;

  @Column() @IsString() @ApiProperty() username: string;

  @Column() @IsEmail() @ApiProperty() email: string;

  @Column() @IsString() @ApiProperty() role: string;

  @Column() @IsString() @ApiProperty() password: string;

  @OneToMany(
    type => Token,
    token => token.user,
  )
  tokens: Token[];
}
