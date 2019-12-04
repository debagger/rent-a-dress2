import { IsInt, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  OneToMany
} from "typeorm";
import { catalogItemOption } from "./catalgItemOption";

@Entity()
@TableInheritance({ column: "type" })
export class catalogItem {
  @PrimaryGeneratedColumn() @IsInt() id: number;
  @Column() @IsString() caption: string;
  @Column() @IsString() desc: string;
  @Column() @IsString() img: string;

  @OneToMany(
    type => catalogItemOption,
    option => option.catalogItem
  )
  @IsOptional()
  options: catalogItemOption[];
}
