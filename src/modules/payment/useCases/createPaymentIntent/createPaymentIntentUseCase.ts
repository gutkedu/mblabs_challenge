import { inject, injectable } from "tsyringe";
import { IPaymentProvider } from "@shared/container/providers/PaymentProvider/IPaymentProvider";
import { ICreatePaymentIntentDTO } from "@modules/payment/dtos/ICreatePaymentIntentDTO";
import { AppError } from "@shared/infra/errors/AppError";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUserPaymentRepository } from "@modules/payment/repositories/IUserPaymentRepository";

interface IRequest {
  order_id: string;
  currency: string;
}

@injectable()
export class CreatePaymentIntentUseCase {
  constructor(
    @inject("StripePaymentProvider")
    private paymentProvider: IPaymentProvider,
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UserPaymentRepository")
    private userPaymentRepository: IUserPaymentRepository
  ) {}

  async execute({ order_id, currency }: IRequest): Promise<any> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError("order not found");
    }

    if (
      this.dateProvider.compareIfBefore(
        order.expires_in,
        this.dateProvider.dateNow()
      )
    ) {
      await this.ordersRepository.updateFinishedStatus(order);
      throw new AppError("order is expired");
    }

    const paymentMethod = await this.userPaymentRepository.findByUserId(
      order.user.id
    );

    if (!paymentMethod) {
      throw new AppError("payment method not found");
    }

    const paymentIntent = await this.paymentProvider.createPaymentIntent({
      amount: order.total_price,
      currency,
      payment_method: paymentMethod.payment_method_id,
    });

    await this.userPaymentRepository.removePaymentMethodId(
      paymentMethod.payment_method_id
    );

    await this.ordersRepository.updateFinishedStatus(order);

    return paymentIntent;
  }
}
