import { inject, injectable } from "tsyringe";
import { ITicketsRepository } from "@modules/tickets/repositories/ITicketsRepository";
import { Ticket } from "@modules/tickets/infra/typeorm/entities/Ticket";

@injectable()
export class FindAllTicketsUseCase {
  constructor(
    @inject("TicketsRepository")
    private ticketsRepository: ITicketsRepository
  ) {}

  async execute(): Promise<Ticket[]> {
    const tickets = await this.ticketsRepository.findAll();

    return tickets;
  }
}
