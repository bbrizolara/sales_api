import IPaginate from "@shared/utils/pagination";
import { ICreateUser } from "../models/iCreateUser";
import { IUpdateUserAvatar } from "../models/iUpdateUserAvatar";
import { IUser } from "../models/iUser";

export interface IUsersRepository {
  findByName(name: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findAllPaginate(): Promise<IPaginate>;
  create(data: ICreateUser): Promise<IUser>;
  save(customer: IUser): Promise<IUser>;
  remove(customer: IUser): Promise<void>;
  updateAvatar(data: IUpdateUserAvatar): Promise<IUser>;
}
