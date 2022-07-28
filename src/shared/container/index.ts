import { container } from "tsyringe";
import "../container/providers";

import { UserTokensRepository } from "@modules/account/infra/typeorm/repositories/UserTokensRepository";
import { IUsersRepository } from "@modules/account/repositories/IUserRepository";
import { IUserTokensRepository } from "@modules/account/repositories/IUserTokensRepository";
import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { IRolesRepository } from "@modules/account/repositories/IRolesRepository";
import { RolesRepository } from "@modules/account/infra/typeorm/repositories/RolesRepository";
import { ITicketsRepository } from "@modules/tickets/repositories/ITicketsRepository";
import { TicketRepository } from "@modules/tickets/infra/typeorm/repositories/TicketsRepository";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { OrdersRepository } from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import { IUserPaymentRepository } from "@modules/payment/repositories/IUserPaymentRepository";
import { UserPaymentRepository } from "@modules/payment/infra/typeorm/repositories/UserPaymentRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);

container.registerSingleton<IRolesRepository>(
  "RolesRepository",
  RolesRepository
);

container.registerSingleton<ITicketsRepository>(
  "TicketsRepository",
  TicketRepository
);

container.registerSingleton<IOrdersRepository>(
  "OrdersRepository",
  OrdersRepository
);

container.registerSingleton<IUserPaymentRepository>(
  "UserPaymentRepository",
  UserPaymentRepository
);
