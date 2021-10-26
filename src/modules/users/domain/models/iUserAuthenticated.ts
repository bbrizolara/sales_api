import { IUser } from "./iUser";

export interface IUserAuthenticated {
  user: IUser;
  token: string;
}
