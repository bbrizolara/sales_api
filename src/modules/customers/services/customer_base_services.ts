import { inject } from "tsyringe";
import { iCustomersRepository } from "../domain/repositories/iCustomersRepository";

export abstract class CustomerBaseService {
  protected customerRepository: iCustomersRepository;

  constructor(
    @inject("CustomerRepository")
    customerRepository: iCustomersRepository
  ) {
    this.customerRepository = customerRepository;
  }
}
