import { IPaymentProvider } from "../IPaymentProvider";
import Stripe from "stripe";
import { injectable } from "tsyringe";
import { ICreatePaymentIntentDTO } from "@modules/payment/dtos/ICreatePaymentIntentDTO";
import { ICreatePaymentMethodDTO } from "@modules/payment/dtos/ICreatePaymentMethodDTO";

@injectable()
export class StripePaymentProvider implements IPaymentProvider {
  private stripe_public: Stripe;
  private stripe_secret: Stripe;
  constructor() {
    this.stripe_public = new Stripe(process.env.STRIPE_TEST_API_KEY, {
      apiVersion: null,
    });

    this.stripe_secret = new Stripe(process.env.STRIPE_TEST_API_SECRET, {
      apiVersion: null,
    });
  }
  async createPaymentIntent({
    amount,
    currency,
    payment_method,
  }: ICreatePaymentIntentDTO): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const paymentIntent = await this.stripe_secret.paymentIntents.create({
      amount,
      currency,
      payment_method,
    });
    return paymentIntent;
  }

  async createPaymentMethod({
    type,
    card,
  }: ICreatePaymentMethodDTO): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    const paymentMethod = await this.stripe_public.paymentMethods.create({
      type,
      card,
    });
    return paymentMethod;
  }
}
