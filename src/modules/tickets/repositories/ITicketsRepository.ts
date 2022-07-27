import { ICreateTicketDTO } from "../dtos/ICreateTicketDTO";
import { Ticket } from "../infra/typeorm/entities/Ticket";

export interface ITicketsRepository {
  create({
    event,
    price,
    description,
    event_date,
  }: ICreateTicketDTO): Promise<Ticket>;
  findById(id: string): Promise<Ticket>;
  findByEvent(event: string): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
  deleteById(id: string): Promise<void>;
  findByIds(tickets_id: string[]): Promise<Ticket[]>;
}
