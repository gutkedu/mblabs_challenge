import { v4 as uuidV4 } from "uuid";
import { IsIn, IsString, MaxLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("roles")
export class Role {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsString()
  @IsIn(["costumer", "admin"])
  privilege: string;

  @Column()
  @IsString()
  @MaxLength(50)
  description: string;

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
