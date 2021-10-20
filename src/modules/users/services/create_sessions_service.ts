import AppError from "@shared/errors/app_error";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/user";
import { UserRepository } from "../typeorm/repositories/users_repository";
import authConfig from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public static async execute({
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new AppError("Invalid credentials", 401);
    }
    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
