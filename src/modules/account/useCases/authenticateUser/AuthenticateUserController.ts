import { validate } from "class-validator";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { AppError } from "@shared/infra/errors/AppError";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return res.json(token);
  }
}
