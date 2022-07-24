import { container } from "tsyringe";
import "../container/providers";

import { UserTokensRepository } from "@modules/account/infra/typeorm/repositories/UserTokensRepository";
import { IUsersRepository } from "@modules/account/repositories/IUserRepository";
import { IUserTokensRepository } from "@modules/account/repositories/IUserTokensRepository";
import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);
