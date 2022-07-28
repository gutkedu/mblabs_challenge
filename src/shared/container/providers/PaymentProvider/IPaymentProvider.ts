import Stripe from "stripe";
import { ICreatePaymentIntentDTO } from "@modules/payment/dtos/ICreatePaymentIntentDTO";
import { ICreateUserPaymentMethodDTO } from "@modules/payment/dtos/ICreateUserPaymentMethodDTO";

export interface IPaymentProvider {
  createPaymentMethod({
    card,
    type,
  }: ICreateUserPaymentMethodDTO): Promise<any>;
  createPaymentIntent({}: ICreatePaymentIntentDTO): Promise<any>;
}
