import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../typeorm/repositories/customer_repository";

class ListCustomersService {
  public static async execute() {
    const customersRepository = getCustomRepository(CustomerRepository);
    const customers = await customersRepository.find();
    return customers;
  }
}

export default ListCustomersService;
