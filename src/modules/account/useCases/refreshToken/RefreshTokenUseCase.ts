import authConfig from "@config/authConfig";
import { IUserTokensRepository } from "@modules/account/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/infra/errors/AppError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<IResponse> {
    const { email, sub } = verify(
      token,
      authConfig.secret_refresh_token
    ) as IPayload;

    const user_id = sub;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("refresh token does not exist");
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, authConfig.secret_refresh_token, {
      subject: sub,
      expiresIn: authConfig.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      authConfig.expires_refresh_token_days
    );

    await this.userTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, authConfig.secret_token, {
      subject: user_id,
      expiresIn: authConfig.expires_in_token,
    });

    return { token: newToken, refresh_token };
  }
}
