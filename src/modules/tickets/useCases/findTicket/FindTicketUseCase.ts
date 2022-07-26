import { inject, injectable } from "tsyringe";
import { ITicketsRepository } from "@modules/tickets/repositories/ITicketsRepository";
import { AppError } from "@shared/infra/errors/AppError";
import { Ticket } from "@modules/tickets/infra/typeorm/entities/Ticket";

@injectable()
export class FindTicketUseCase {
  constructor(
    @inject("TicketsRepository")
    private ticketsRepository: ITicketsRepository
  ) {}

  async execute(id: string): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new AppError("ticket not found");
    }

    return ticket;
  }
}
