import { inject, injectable } from "tsyringe";
import { ITicketsRepository } from "@modules/tickets/repositories/ITicketsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";
import { IOrdersRepository } from "../repositories/IOrdersRepository";
import { IUsersRepository } from "@modules/account/repositories/IUserRepository";
import { AppError } from "@shared/infra/errors/AppError";
import orderConfig from "@config/orderConfig";
import { Order } from "../infra/typeorm/entities/Order";

interface IRequest {
  user_id: string;
  tickets_id: string[];
}

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository,
    @inject("TicketsRepository")
    private ticketsRepository: ITicketsRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, tickets_id }: IRequest): Promise<Order> {
    let total_price: number = 0;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("user does not exist");
    }

    const tickets = await this.ticketsRepository.findByIds(tickets_id);

    if (tickets.length === 0) {
      throw new AppError("tickets not found");
    }

    for (const ticket of tickets) {
      total_price += Number(ticket.price);
    }

    const expires_in = this.dateProvider.addHours(orderConfig.expireInHours);

    const order = await this.ordersRepository.create({
      total_price,
      expires_in,
      user,
      tickets,
    });

    return order;
  }
}
