import { v4 as uuidV4 } from "uuid";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  @MaxLength(25)
  @MinLength(3)
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

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

export { User };
