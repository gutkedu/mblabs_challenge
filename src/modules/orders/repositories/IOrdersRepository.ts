import { Ticket } from "@modules/tickets/infra/typeorm/entities/Ticket";
import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";
import { Order } from "../infra/typeorm/entities/Order";

export interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  findByUserAndTickets(
    user_id: string,
    tickets_id: string[]
  ): Promise<Ticket[]>;
}
