import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveUserUseCase } from "./RemoveUserUseCase";

export class RemoveUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const removeUserUseCase = container.resolve(RemoveUserUseCase);

    await removeUserUseCase.execute(id);

    return res.status(204).send();
  }
}
