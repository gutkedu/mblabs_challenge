import { getRepository, Repository } from "typeorm";

import { ICreateTicketDTO } from "@modules/tickets/dtos/ICreateTicketDTO";
import { ITicketsRepository } from "@modules/tickets/repositories/ITicketsRepository";
import { Ticket } from "../entities/Ticket";

export class TicketRepository implements ITicketsRepository {
  private repository: Repository<Ticket>;

  constructor() {
    this.repository = getRepository(Ticket);
  }

  async create({
    event,
    price,
    description,
    event_date,
    id,
  }: ICreateTicketDTO): Promise<Ticket> {
    const ticket = this.repository.create({
      event,
      price,
      description,
      event_date,
      id,
    });
    await this.repository.save(ticket);
    return ticket;
  }

  async findById(id: string): Promise<Ticket> {
    const ticket = await this.repository.findOne({ id });
    return ticket;
  }

  async findAll(): Promise<Ticket[]> {
    const tickets = await this.repository.find();
    return tickets;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(Ticket)
      .where("id = :id", { id })
      .execute();
    return;
  }

  async findByEvent(event: string): Promise<Ticket> {
    const ticket = await this.repository.findOne({ event: event });
    return ticket;
  }

  async findByIds(tickets_id: string[]): Promise<Ticket[]> {
    const tickets = await this.repository.findByIds(tickets_id);
    return tickets;
  }
}
