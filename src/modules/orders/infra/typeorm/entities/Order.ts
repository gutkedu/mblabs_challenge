import { User } from "@modules/account/infra/typeorm/entities/User";
import { Ticket } from "@modules/tickets/infra/typeorm/entities/Ticket";
import { IsDateString, IsIn, IsPositive } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @ManyToMany(() => Ticket)
  @JoinTable({
    name: "orders_tickets",
    joinColumns: [{ name: "order_id" }],
    inverseJoinColumns: [{ name: "ticket_id" }],
  })
  tickets: Ticket[];

  @Column()
  @IsPositive()
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.status = "pending";
    }
  }
}
