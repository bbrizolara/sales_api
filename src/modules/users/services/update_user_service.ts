import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/users_repository";

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

class UpdateUserService {
  public static async execute({ id, name, email, password, avatar }: IRequest) {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    user.name = name;
    user.password = password;
    user.avatar = avatar;
    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserService;
