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
export class catalogItem {
  @PrimaryGeneratedColumn() @IsInt() id: number;
  @Column() @IsString() caption: string;
  @Column() @IsString() desc: string;
  @Column() @IsString() img: string;
  @Column({nullable:true}) @IsInt() price?: number; 

  @OneToMany(
    type => catalogItemOption,
    option => option.catalogItem
  )
  @IsOptional()
  options: catalogItemOption[];
}
