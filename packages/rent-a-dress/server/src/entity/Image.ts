import { IsString, IsInt } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn() @IsInt() id: number;
  @Column() @IsString() imageName: String;
  @Column() @IsString() hash: String;
  @Column() @IsInt() catalogItemId: number;
}
