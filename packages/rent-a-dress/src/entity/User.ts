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
  @PrimaryGeneratedColumn() id: number;

  @Column() username: string;

  @Column() email: string;

  @Column() role: string;

  @Column() password: string;

  @OneToMany(
    type => Token,
    token => token.user
  )
  tokens: Token[];
}
