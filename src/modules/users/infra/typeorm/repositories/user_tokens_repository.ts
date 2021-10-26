import { IUsersTokenRepository } from "@modules/users/domain/repositories/iUsersTokenRepository";
import { getRepository, Repository } from "typeorm";
import UserToken from "../entities/user_token";

export class UserTokenRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string) {
    return await this.ormRepository.findOne({
      where: {
        token,
      },
    });
  }

  public async generate(user_id: string) {
    const userToken = this.ormRepository.create({
      user_id,
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }
}
