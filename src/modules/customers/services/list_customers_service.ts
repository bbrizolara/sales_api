import IPaginate from "@shared/utils/pagination";
import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../typeorm/repositories/customer_repository";

class ListCustomersService {
  public static async execute() {
    const customersRepository = getCustomRepository(CustomerRepository);
    const customers = await customersRepository.createQueryBuilder().paginate();
    return customers as IPaginate;
  }
}

export default ListCustomersService;
