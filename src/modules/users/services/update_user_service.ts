import AppError from "@shared/errors/app_error";
import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUpdateUser } from "../domain/models/iUpdateUser";
import { IUsersRepository } from "../domain/repositories/iUsersRepository";

@injectable()
class UpdateUserService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject("UserRepository")
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ id, name, password, oldPassword }: IUpdateUser) {
    const user = await this.usersRepository.findById(id);
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
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserService;
