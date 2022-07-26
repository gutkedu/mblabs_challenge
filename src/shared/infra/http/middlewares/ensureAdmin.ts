import { Role } from "@modules/account/infra/typeorm/entities/Role";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { RolesRepository } from "@modules/account/infra/typeorm/repositories/RolesRepository";
import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/infra/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;
  let isAdmin!: boolean;

  try {
    const roleRepository = new RolesRepository();
    const adminRole = await roleRepository.findByPrivilege("admin");

    const user = await getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.roles", "roles")
      .where("user.id = :id", { id })
      .getOne();

    user.roles.forEach((element) => {
      if (element.id === adminRole.id) {
        isAdmin = true;
      }
    });
  } catch (error) {
    throw new AppError("invalid role credentials", error);
  }

  if (isAdmin === true) {
    await next();
  } else {
    throw new AppError("invalid role credentials");
  }
}
