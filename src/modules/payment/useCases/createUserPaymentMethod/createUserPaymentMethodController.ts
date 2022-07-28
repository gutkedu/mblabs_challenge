import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserPaymentMethodUseCase } from "./createUserPaymentMethodUseCase";

export class CreateUserPaymentMethodController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { type, card } = req.body;
    const { id: user_id } = req.user;

    const createUserPaymentMethodUseCase = container.resolve(
      CreateUserPaymentMethodUseCase
    );

    await createUserPaymentMethodUseCase.execute({
      type,
      card,
      user_id,
    });

    return res.status(204).send();
  }
}
