import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/iUsersRepository";

@injectable()
class ListUsersService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject("UserRepository")
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute() {
    const users = await this.usersRepository.findAllPaginate();
    return users;
  }
}

export default ListUsersService;
