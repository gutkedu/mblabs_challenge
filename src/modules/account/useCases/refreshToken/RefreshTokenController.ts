import { AppError } from "@shared/infra/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token || req.headers["x-access-token"] || req.query.token;

    if (!token) {
      throw new AppError("token is required");
    }

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const message = await refreshTokenUseCase.execute(token);

    return res.json({ message });
  }
}
