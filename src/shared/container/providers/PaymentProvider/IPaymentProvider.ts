import Stripe from "stripe";
import { ICreatePaymentIntentDTO } from "@modules/payment/dtos/ICreatePaymentIntentDTO";
import { ICreatePaymentMethodDTO } from "@modules/payment/dtos/ICreatePaymentMethodDTO";

export interface IPaymentProvider {
  createPaymentMethod({}: ICreatePaymentMethodDTO): Promise<
    Stripe.Response<Stripe.PaymentMethod>
  >;
  createPaymentIntent({}: ICreatePaymentIntentDTO): Promise<
    Stripe.Response<Stripe.PaymentIntent>
  >;
}
