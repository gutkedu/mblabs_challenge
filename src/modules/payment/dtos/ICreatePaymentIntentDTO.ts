export interface ICreatePaymentIntentDTO {
  amount: number;
  currency: string;
  payment_method: string;
}
