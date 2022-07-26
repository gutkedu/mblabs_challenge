import { inject, injectable } from "tsyringe";
import { ICreateTicketDTO } from "@modules/tickets/dtos/ICreateTicketDTO";
import { Ticket } from "@modules/tickets/infra/typeorm/entities/Ticket";
import { ITicketsRepository } from "@modules/tickets/repositories/ITicketsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/infra/errors/AppError";

@injectable()
export class CreateTicketUseCase {
  constructor(
    @inject("TicketsRepository")
    private ticketsRepository: ITicketsRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({
    event,
    price,
    description,
    event_date,
  }: ICreateTicketDTO): Promise<Ticket> {
    const eventAlreadyExist = await this.ticketsRepository.findByEvent(event);

    if (eventAlreadyExist) {
      throw new AppError("a ticket with the same event name already exist");
    }

    if (
      this.dateProvider.compareIfBefore(event_date, this.dateProvider.dateNow())
    ) {
      throw new AppError("event need to happen in a future date");
    }

    const ticket = await this.ticketsRepository.create({
      event,
      price,
      description,
      event_date,
    });

    return ticket;
  }
}
