import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllTicketsUseCase } from "./findAllTicketsUseCase";

export class FindAllTicketsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllTicketsUseCase = container.resolve(FindAllTicketsUseCase);

    const tickets = await findAllTicketsUseCase.execute();

    return res.status(200).json({ tickets });
  }
}
