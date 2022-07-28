import { inject, injectable } from "tsyringe";
import { IPaymentProvider } from "@shared/container/providers/PaymentProvider/IPaymentProvider";
import { AppError } from "@shared/infra/errors/AppError";
import { IUserPaymentRepository } from "@modules/payment/repositories/IUserPaymentRepository";
import { IUsersRepository } from "@modules/account/repositories/IUserRepository";
import { ICreateUserPaymentMethodDTO } from "@modules/payment/dtos/ICreateUserPaymentMethodDTO";

@injectable()
export class CreateUserPaymentMethodUseCase {
  constructor(
    @inject("StripePaymentProvider")
    private paymentProvider: IPaymentProvider,
    @inject("UserPaymentRepository")
    private userPaymentRepository: IUserPaymentRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    type,
    card,
    user_id,
  }: ICreateUserPaymentMethodDTO): Promise<void> {
    try {
      const paymentMethod = await this.paymentProvider.createPaymentMethod({
        type,
        card,
      });

      const user = await this.usersRepository.findById(user_id);

      await this.userPaymentRepository.create({
        payment_method_id: paymentMethod.id,
        user,
      });
    } catch (error) {
      throw new AppError("invalid payment method input");
    }
  }
}
