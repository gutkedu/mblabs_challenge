import { User } from "@modules/account/infra/typeorm/entities/User";
import { Ticket } from "@modules/tickets/infra/typeorm/entities/Ticket";
import { IsDateString, IsIn } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("orders")
export class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsIn(["pending", "finished"])
  status: string;

  @Column()
  @IsDateString()
  expires_in: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToOne(() => Ticket)
  @JoinColumn({ name: "ticket_id" })
  ticket: Ticket;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
