import AppError from "@shared/errors/app_error";
import { inject, injectable } from "tsyringe";
import { IShowUser } from "../domain/models/iShowUser";
import { IUsersRepository } from "../domain/repositories/iUsersRepository";

@injectable()
class ShowUserService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject("UserRepository")
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ id }: IShowUser) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
}

export default ShowUserService;
