import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindTicketUseCase } from "./FindTicketUseCase";

export class FindTicketController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findTicketUseCase = container.resolve(FindTicketUseCase);

    const ticket = await findTicketUseCase.execute(id);

    return res.status(200).json({ ticket });
  }
}
