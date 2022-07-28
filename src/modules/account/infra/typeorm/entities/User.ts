import { v4 as uuidV4 } from "uuid";
import {
  IsAlpha,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { Role } from "./Role";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsAlpha()
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

  @ManyToMany(() => Role)
  @JoinTable({
    name: "user_roles",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "role_id" }],
  })
  roles: Role[];

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
