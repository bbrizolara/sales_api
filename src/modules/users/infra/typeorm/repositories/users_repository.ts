import { ICreateUser } from "@modules/users/domain/models/iCreateUser";
import { IUser } from "@modules/users/domain/models/iUser";
import { IUsersRepository } from "@modules/users/domain/repositories/iUsersRepository";
import { getRepository, Repository } from "typeorm";
import User from "../entities/user";

export class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByName(name: string) {
    return await this.ormRepository.findOne({
      where: {
        name,
      },
    });
  }

  public async findByEmail(email: string) {
    return await this.ormRepository.findOne({
      where: {
        email,
      },
    });
  }

  public async findById(id: string) {
    return await this.ormRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async create({ name, email, password }: ICreateUser) {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: IUser) {
    await this.ormRepository.save(user);
    return user;
  }
}
