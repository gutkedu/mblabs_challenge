import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/account/repositories/IUserRepository";
import { User } from "@modules/account/infra/typeorm/entitites/User";

export class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password, id }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      id,
    });
    await this.repository.save(user);
    return;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();
    return;
  }
}
