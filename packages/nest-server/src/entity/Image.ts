import { IsString, IsInt } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn() @IsInt() id: number;
  @Column() @IsString() imageName: String;
  @Column() @IsString() hash: String;
  @Column() @IsInt() catalogItemId: number;
  @Column({default: "0", type: "int", nullable:true}) @IsInt() Width?: number;
  @Column({default: "0", type: "int", nullable:true}) @IsInt() Height?: number; 
}
