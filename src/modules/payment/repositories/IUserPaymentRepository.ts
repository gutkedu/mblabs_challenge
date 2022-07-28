import { ICreateUserPaymentDTO } from "../dtos/ICreateUserPaymentDTO";
import { UserPayment } from "../infra/typeorm/entities/UserPayment";

export interface IUserPaymentRepository {
  create(data: ICreateUserPaymentDTO): Promise<void>;
  findByUserId(id: string): Promise<UserPayment>;
  removePaymentMethodId(id: string): Promise<void>;
}
