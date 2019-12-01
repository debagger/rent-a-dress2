import {IsNumber, IsInt, IsString} from "class-validator"
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { User } from "./User"; 

@Entity() 
export class Token {
  @PrimaryGeneratedColumn() @IsInt() id: number;
  @Column() @IsString() token: string;
  
  @ManyToOne(
    type => User,
    user => user.id, {
        eager: true
    }
  )
  user: User;
}
