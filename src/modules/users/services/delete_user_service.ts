import AppError from "@shared/errors/app_error";
import { inject, injectable } from "tsyringe";
import { IDeleteUser } from "../domain/models/iDeleteUser";
import { IUsersRepository } from "../domain/repositories/iUsersRepository";

@injectable()
class DeleteUserService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject("UserRepository")
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ id }: IDeleteUser) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    await this.usersRepository.remove(user);
    return true;
  }
}

export default DeleteUserService;
