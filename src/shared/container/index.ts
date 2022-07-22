import { container } from "tsyringe";
import { UserRepository } from "@modules/account/infra/typeorm/repositories/UserRepository";
import { UserTokensRepository } from "@modules/account/infra/typeorm/repositories/UserTokensRepository";
import { IUsersRepository } from "@modules/account/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUserTokensRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UserRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);
