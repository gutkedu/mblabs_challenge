import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { IUsersRepository } from "@modules/account/repositories/IUserRepository";
import { IUserTokensRepository } from "@modules/account/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/infra/errors/AppError";

interface IRequest {
  password: string;
  token: string;
}

@injectable()
export class ResetUserPasswordUseCase {
  constructor(
    @inject("UserTokensRepository")
    private usersTokenRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("invalid token");
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("expired token");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokenRepository.deleteById(userToken.id);
  }
}
