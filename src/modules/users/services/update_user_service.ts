import AppError from "@shared/errors/app_error";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../infra/typeorm/repositories/users_repository";

interface IRequest {
  userId: string;
  name: string;
  password?: string;
  oldPassword?: string;
}

class UpdateUserService {
  public static async execute({
    userId,
    name,
    password,
    oldPassword,
  }: IRequest) {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (password && !oldPassword) {
      throw new AppError("Old password is required", 400);
    }

    if (password && oldPassword) {
      const oldPasswordConfirmed = await compare(oldPassword, user.password);
      if (!oldPasswordConfirmed) {
        throw new AppError("Old password does not match", 400);
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserService;
