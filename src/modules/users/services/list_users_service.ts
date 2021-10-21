import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/users_repository";

class ListUsersService {
  public static async execute() {
    const usersRepository = getCustomRepository(UserRepository);
    const users = await usersRepository.find();
    return users;
  }
}

export default ListUsersService;
