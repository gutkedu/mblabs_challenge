import {
  IsAlphanumeric,
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from "class-validator";
import { Column, CreateDateColumn, PrimaryColumn } from "typeorm";

export class Ticket {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsAlphanumeric()
  @MaxLength(50)
  event: string;

  @Column()
  @IsNumber()
  @IsPositive()
  price: number;

  @Column()
  @IsString()
  @MaxLength(300)
  description: string;

  @Column()
  @IsDate()
  event_date: Date;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
