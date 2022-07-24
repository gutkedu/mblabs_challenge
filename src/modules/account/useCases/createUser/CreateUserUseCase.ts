import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/account/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new AppError("User already exist");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}
