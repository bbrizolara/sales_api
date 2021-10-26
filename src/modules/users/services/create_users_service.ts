import AppError from "@shared/errors/app_error";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { ICreateUser } from "../domain/models/iCreateUser";
import { IUsersRepository } from "../domain/repositories/iUsersRepository";

@injectable()
class CreateUserService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject("UserRepository")
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ name, email, password }: ICreateUser) {
    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists) {
      throw new AppError("Email is already in use");
    }
    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
