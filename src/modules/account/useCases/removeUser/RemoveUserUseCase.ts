import { IUsersRepository } from "@modules/account/repositories/IUserRepository";
import { AppError } from "@shared/infra/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class RemoveUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const userExist = await this.usersRepository.findById(id);

    if (!userExist) {
      throw new AppError("User not found");
    }

    await this.usersRepository.delete(id);
  }
}
