import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/user_token";

@EntityRepository(UserToken)
export class UserTokenRepository extends Repository<UserToken> {
  public async findByUserId(user_id: string) {
    return await this.findOne({
      where: {
        user_id,
      },
    });
  }

  public async findByToken(token: string) {
    return await this.findOne({
      where: {
        token,
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

  public async generate(user_id: string) {
    const userToken = this.create({
      user_id,
    });
    await this.save(userToken);
    return userToken;
  }
}
