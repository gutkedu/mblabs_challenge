import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

export class CreateOrderController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { tickets_id } = req.body;

    const createOrderUseCase = container.resolve(CreateOrderUseCase);

    const created_order = await createOrderUseCase.execute({
      user_id: id,
      tickets_id,
    });

    return res.status(201).json({ created_order });
  }
}
