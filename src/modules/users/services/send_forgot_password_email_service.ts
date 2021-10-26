import AppError from "@shared/errors/app_error";
import etherealEmail from "@config/email/ethereal_email";
import path from "path";
import { ISendForgotPasswordEmail } from "../domain/models/iSendForgotPasswordEmail";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/iUsersRepository";
import { IUsersTokenRepository } from "../domain/repositories/iUsersTokenRepository";

@injectable()
class SendForgotPasswordEmailService {
  private usersRepository: IUsersRepository;
  private usersTokenRepository: IUsersTokenRepository;

  constructor(
    @inject("UsersRepository")
    usersRepository: IUsersRepository,

    @inject("UserTokenRepository")
    usersTokenRepository: IUsersTokenRepository
  ) {
    this.usersRepository = usersRepository;
    this.usersTokenRepository = usersTokenRepository;
  }

  public async execute({ email }: ISendForgotPasswordEmail) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const { token } = await this.usersTokenRepository.generate(user.id);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs"
    );
    await etherealEmail.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "Password recovery",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          //this would be a frontend link
          link: `${process.env.APP_WEB_URL}password/reset?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
