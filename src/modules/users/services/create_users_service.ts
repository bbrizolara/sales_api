import AppError from "@shared/errors/app_error";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/users_repository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public static async execute({ name, email, password }: IRequest) {
    const usersRepository = getCustomRepository(UserRepository);
    const userExists = await usersRepository.findByEmail(email);
    if (userExists) {
      throw new AppError("Email is already in use");
    }
    const hashedPassword = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
