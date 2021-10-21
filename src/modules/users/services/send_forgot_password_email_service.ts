import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/users_repository";
import { UserTokenRepository } from "../typeorm/repositories/user_tokens_repository";

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
    const token = await userTokenRepository.generate(user.id);
    console.log(token);
  }
}

export default SendForgotPasswordEmailService;
