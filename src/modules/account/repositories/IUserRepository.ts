import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/infra/typeorm/entitites/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  delete(id: string): Promise<void>;
}
