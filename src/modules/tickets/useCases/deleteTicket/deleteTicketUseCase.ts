import { inject, injectable } from "tsyringe";
import { ITicketsRepository } from "@modules/tickets/repositories/ITicketsRepository";
import { AppError } from "@shared/infra/errors/AppError";

@injectable()
export class DeleleteTicketUseCase {
  constructor(
    @inject("TicketsRepository")
    private ticketsRepository: ITicketsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const ticketExist = await this.ticketsRepository.findById(id);

    if (!ticketExist) {
      throw new AppError("ticket not found");
    }

    await this.ticketsRepository.deleteById(id);
  }
}
