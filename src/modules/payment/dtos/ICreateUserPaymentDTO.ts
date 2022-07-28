import { User } from "@modules/account/infra/typeorm/entities/User";

export interface ICreateUserPaymentDTO {
  user: User;
  payment_method_id: string;
}
