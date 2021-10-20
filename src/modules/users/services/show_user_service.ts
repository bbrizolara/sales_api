import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/users_repository";

interface IRequest {
  id: string;
}

class ShowUserService {
  public static async execute({ id }: IRequest) {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
}

export default ShowUserService;
