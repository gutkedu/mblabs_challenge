import { UserRepository } from "@modules/account/infra/typeorm/repositories/UserRepository";
import { IUsersRepository } from "@modules/account/repositories/IUserRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UserRepository
);
