import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { Ticket } from "@modules/tickets/infra/typeorm/entities/Ticket";
import { getRepository, Repository } from "typeorm";
import { Order } from "../entities/Order";

export class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  async create({
    status,
    expires_in,
    user,
    total_price,
    tickets,
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.repository.create({
      status,
      expires_in,
      user,
      total_price,
      tickets,
    });

    await this.repository.save(order);

    return order;
  }

  findByUserAndTickets(
    user_id: string,
    tickets_id: string[]
  ): Promise<Ticket[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Order> {
    const order = await this.repository
      .createQueryBuilder("orders")
      .leftJoinAndSelect("orders.user", "users")
      .where("orders.id = :id", { id })
      .getOne();
    return order;
  }

  async updateFinishedStatus(order: Order): Promise<void> {
    order.status = "finished";
    await this.repository.save(order);
  }
}
