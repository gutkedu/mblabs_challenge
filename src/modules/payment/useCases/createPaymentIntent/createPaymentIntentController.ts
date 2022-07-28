import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePaymentIntentUseCase } from "./createPaymentIntentUseCase";

export class CreatePaymentIntentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { order_id, currency } = req.body;

    const createPaymentIntentUseCase = container.resolve(
      CreatePaymentIntentUseCase
    );

    const paymentIntentResponse = await createPaymentIntentUseCase.execute({
      order_id,
      currency,
    });

    return res.status(200).json({ paymentIntentResponse });
  }
}
