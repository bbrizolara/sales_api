import AppError from "@shared/errors/app_error";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";
import { IResetPassword } from "../domain/models/iResetPassword";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/iUsersRepository";
import { IUsersTokenRepository } from "../domain/repositories/iUsersTokenRepository";

@injectable()
class ResetPasswordService {
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

  public async execute({ token, password }: IResetPassword) {
    const userToken = await this.usersTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError("User token not found", 404);
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const compareDate = addHours(userToken.created_at, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired");
    }
    const hashedPassword = await hash(password, 8);
    user.password = hashedPassword;
    await this.usersRepository.save(user);
    return user;
  }
}

export default ResetPasswordService;
