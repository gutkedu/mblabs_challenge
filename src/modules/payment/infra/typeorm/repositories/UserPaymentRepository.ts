import { ICreateUserPaymentDTO } from "@modules/payment/dtos/ICreateUserPaymentDTO";
import { IUserPaymentRepository } from "@modules/payment/repositories/IUserPaymentRepository";
import { getRepository, Repository } from "typeorm";
import { UserPayment } from "../entities/UserPayment";

export class UserPaymentRepository implements IUserPaymentRepository {
  private repository: Repository<UserPayment>;

  constructor() {
    this.repository = getRepository(UserPayment);
  }

  async create({
    payment_method_id,
    user,
  }: ICreateUserPaymentDTO): Promise<void> {
    const userPayment = await this.repository.create({
      payment_method_id,
      user,
    });

    await this.repository.save(userPayment);
  }

  async findByUserId(id: string): Promise<UserPayment> {
    const userPayment = await this.repository
      .createQueryBuilder("user_payment")
      .leftJoinAndSelect("user_payment.user", "users")
      .where("user_payment.user_id = :id", { id })
      .getOne();
    return userPayment;
  }

  async removePaymentMethodId(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(UserPayment)
      .where("user_payment.payment_method_id = :id", { id })
      .execute();
  }
}
