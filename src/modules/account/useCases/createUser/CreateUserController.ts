import { User } from "@modules/account/infra/typeorm/entities/User";
import { AppError } from "@shared/infra/errors/AppError";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    const error = await validate(user);
    if (error.length > 0) {
      throw new AppError("validation failed", 400, error);
    }

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
    });
    return res.status(201).send();
  }
}
