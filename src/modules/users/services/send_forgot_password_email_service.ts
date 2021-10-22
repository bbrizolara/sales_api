import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/users_repository";
import { UserTokenRepository } from "../typeorm/repositories/user_tokens_repository";
import etherealEmail from "@config/email/ethereal_email";
import path from "path";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public static async execute({ email }: IRequest) {
    const userTokenRepository = getCustomRepository(UserTokenRepository);
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const { token } = await userTokenRepository.generate(user.id);
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
