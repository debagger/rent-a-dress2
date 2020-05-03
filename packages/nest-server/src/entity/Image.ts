import { IsString, IsInt } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity()
export class Image {
  @PrimaryGeneratedColumn() @IsInt() @ApiProperty() id: number;
  @Column() @IsString() @ApiProperty() imageName: String;
  @Column() @IsString() @ApiProperty() hash: String;
  @Column({nullable:true}) @IsInt() @ApiPropertyOptional() catalogItemId?: number;
  @Column({default: "0", type: "int", nullable:true}) @IsInt() @ApiPropertyOptional() Width?: number;
  @Column({default: "0", type: "int", nullable:true}) @IsInt() @ApiPropertyOptional() Height?: number; 
}
