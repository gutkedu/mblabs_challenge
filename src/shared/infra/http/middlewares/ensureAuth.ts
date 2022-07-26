import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/authConfig";
import { AppError } from "@shared/infra/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("the token is missing", 401);
  }

  const [, token] = authHeader.split("");

  try {
    const { sub: user_id } = verify(token, authConfig.secret_token) as IPayload;

    req.user = {
      id: user_id,
    };
  } catch (error) {
    throw new AppError("invalid token", 401);
  }
}
