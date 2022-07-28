export interface ICreateUserPaymentMethodDTO {
  type: any;
  card: {
    number: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
  };
  user_id?: string;
}
