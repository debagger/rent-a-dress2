import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class Token {
  @PrimaryColumn("text") token: string;
  
  @ManyToOne(
    type => User,
    user => user.username, {
        eager: true
    }
  )
  user: User;
}
