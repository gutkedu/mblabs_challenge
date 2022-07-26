import { Response, Request } from "express";
import { container } from "tsyringe";
import { DeleleteTicketUseCase } from "./deleteTicketUseCase";

export class DeleteTicketController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteTicketUseCase = container.resolve(DeleleteTicketUseCase);

    await deleteTicketUseCase.execute(id);

    return res.status(204).send();
  }
}
