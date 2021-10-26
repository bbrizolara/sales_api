import { IUserToken } from "../models/iUserToken";

export interface IUsersTokenRepository {
  findByToken(token: string): Promise<IUserToken | undefined>;
  generate(user_id: string): Promise<IUserToken>;
}
