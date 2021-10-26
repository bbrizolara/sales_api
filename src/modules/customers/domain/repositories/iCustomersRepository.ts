import IPaginate from "@shared/utils/pagination";
import { ICreateCustomer } from "../models/iCreateCustomer";
import { ICustomer } from "../models/iCustomer";

export interface iCustomersRepository {
  findByName(name: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findAllPaginate(): Promise<IPaginate>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
}
