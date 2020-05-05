import { IsInt, IsString } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { catalogItem } from "./catalog-item.entity";

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
