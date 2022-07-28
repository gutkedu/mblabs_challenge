import Stripe from "stripe";

export interface ICreateUserPaymentMethodDTO {
  type: Stripe.PaymentMethodCreateParams.Type;
  card: {
    number: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
  };
  user_id: string;
}
