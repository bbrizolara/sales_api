import AppError from "@shared/errors/app_error";
import { compare, hash } from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";
import authConfig from "@config/auth";
import { ICreateSession } from "../domain/models/iCreateSession";
import { IUserAuthenticated } from "../domain/models/IUserAuthenticated";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/iUsersRepository";

@injectable()
class CreateSessionsService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject("UserRepository")
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({
    email,
    password,
  }: ICreateSession): Promise<IUserAuthenticated> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
