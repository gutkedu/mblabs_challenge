import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { IUsersRepository } from "@modules/account/repositories/IUserRepository";
import { IUserTokensRepository } from "@modules/account/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/infra/errors/AppError";

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "userForgotPasswordEmail.hbs"
    );

    if (!user) {
      throw new AppError("user does not exist");
    }

    const uuidToken = uuidv4();

    const expires_date = this.dateProvider.addHours(2);

    await this.userTokensRepository.create({
      refresh_token: uuidToken,
      expires_date: expires_date,
      user_id: user.id,
    });

    const mailVariables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${uuidToken}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      mailVariables,
      templatePath
    );
  }
}
