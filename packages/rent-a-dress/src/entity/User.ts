import {IsInt, IsString, IsEmail} from "class-validator"
import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { Token } from "./Token";

@Entity()
export class User {
  @PrimaryGeneratedColumn() @IsInt() id: number;

  @Column() @IsString() username: string;

  @Column() @IsEmail() email: string;

  @Column() @IsString() role: string;

  @Column() @IsString() password: string;

  @OneToMany(
    type => Token,
    token => token.user
  )
  tokens: Token[];
}
