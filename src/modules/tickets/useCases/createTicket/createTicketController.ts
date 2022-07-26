import { validate } from "class-validator";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { Ticket } from "@modules/tickets/infra/typeorm/entities/Ticket";
import { AppError } from "@shared/infra/errors/AppError";
import { CreateTicketUseCase } from "./createTicketUseCase";

export class CreateTicketController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { event, price, description, event_date } = req.body;

    let ticketValidation = new Ticket();
    ticketValidation.event = event;
    ticketValidation.price = price;
    ticketValidation.description = description;
    ticketValidation.event_date = event_date;

    const error = await validate(ticketValidation);

    if (error.length > 0) {
      throw new AppError("validation failed", 400, error);
    }

    const createTicketUseCase = container.resolve(CreateTicketUseCase);

    const ticket = await createTicketUseCase.execute({
      event,
      price,
      description,
      event_date,
    });

    return res.status(201).json({ ticket });
  }
}
