import { User } from "@modules/account/infra/typeorm/entities/User";
import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;
  //const userRepository = new UsersRepository();
  //const user = await userRepository.findById(id);
  let isAdmin!: boolean;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id: id });
  const user_roles = await userRepository
    .createQueryBuilder("roles")
    .leftJoinAndSelect("user.roles", "roles")
    .getMany();

  console.log(user);
  console.log(user_roles);
}
