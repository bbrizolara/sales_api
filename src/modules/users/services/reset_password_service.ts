import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../infra/typeorm/repositories/users_repository";
import { UserTokenRepository } from "../infra/typeorm/repositories/user_tokens_repository";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public static async execute({ token, password }: IRequest) {
    const userTokenRepository = getCustomRepository(UserTokenRepository);
    const userRepository = getCustomRepository(UserRepository);

    const userToken = await userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError("User token not found", 404);
    }

    const user = await userRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const compareDate = addHours(userToken.created_at, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired");
    }
    const hashedPassword = await hash(password, 8);
    user.password = hashedPassword;
    await userRepository.save(user);
    return user;
  }
}

export default ResetPasswordService;
