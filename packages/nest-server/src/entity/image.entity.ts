import { IsString, IsInt } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ImageInterface } from './image.interface';

@Entity()
export class Image implements ImageInterface {
  @PrimaryGeneratedColumn() id: number;
  @Column() imageName: String;
  @Column() hash: String;
  @Column({ nullable: true }) catalogItemId?: number;
  @Column({ default: '0', type: 'int', nullable: true }) Width?: number;
  @Column({ default: '0', type: 'int', nullable: true }) Height?: number;
}
