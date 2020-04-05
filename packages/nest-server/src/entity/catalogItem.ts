import { IsInt, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  OneToMany
} from "typeorm";
import { catalogItemOption } from "./catalogItemOption";

@Entity()
export class catalogItem {
  @PrimaryGeneratedColumn() @IsInt() @IsOptional() id: number;
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
