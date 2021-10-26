import { container } from "tsyringe";

//customers
import { iCustomersRepository } from "@modules/customers/domain/repositories/iCustomersRepository";
import { CustomerRepository } from "@modules/customers/infra/typeorm/repositories/customer_repository";

//users
import { IUsersRepository } from "@modules/users/domain/repositories/iUsersRepository";
import { UserRepository } from "@modules/users/infra/typeorm/repositories/users_repository";

container.registerSingleton<iCustomersRepository>(
  "CustomerRepository",
  CustomerRepository
);
container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);
