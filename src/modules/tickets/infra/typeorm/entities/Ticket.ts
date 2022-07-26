import { v4 as uuidV4 } from "uuid";
import {
  IsAlphanumeric,
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("tickets")
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

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
