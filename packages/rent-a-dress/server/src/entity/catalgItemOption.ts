import { IsInt, IsString } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ManyToOne
} from "typeorm";
import { catalogItem } from "./catalogItem";

@Entity()
export class catalogItemOption {
  @PrimaryGeneratedColumn() @IsInt() id: number;

  @ManyToOne(
    type => catalogItem,
    catalogItem => catalogItem.options
  )
  catalogItem: catalogItem;

  @IsString() @Column() size: string;
  @IsString() @Column() color: string;

}
