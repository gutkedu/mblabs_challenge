import { UserTokens } from "@modules/account/infra/typeorm/entities/UserTokens";
import { ICreateUserTokenDTO } from "@modules/account/dtos/ICreateUserTokenDTO";

export interface IUserTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}
