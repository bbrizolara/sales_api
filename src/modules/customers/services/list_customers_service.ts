import IPaginate from "@shared/utils/pagination";
import { inject, injectable } from "tsyringe";
import { iCustomersRepository } from "../domain/repositories/iCustomersRepository";

@injectable()
class ListCustomersService {
  private customerRepository: iCustomersRepository;

  constructor(
    @inject("CustomerRepository")
    customerRepository: iCustomersRepository
  ) {
    this.customerRepository = customerRepository;
  }

  public async execute() {
    const customers = await this.customerRepository.findAllPaginate();
    return customers as IPaginate;
  }
}

export default ListCustomersService;
