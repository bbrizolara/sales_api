import { EntityRepository, Repository } from "typeorm";
import User from "../entities/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByName(name: string) {
    return await this.findOne({
      where: {
        name,
      },
    });
  }

  public async findByEmail(email: string) {
    return await this.findOne({
      where: {
        email,
      },
    });
  }

  public async findById(id: string) {
    return await this.findOne({
      where: {
        id,
      },
    });
  }
}
