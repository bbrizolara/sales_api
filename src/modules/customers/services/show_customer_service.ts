import AppError from "@shared/errors/app_error";
import { inject, injectable } from "tsyringe";
import { IShowCustomer } from "../domain/models/iShowCustomer";
import { iCustomersRepository } from "../domain/repositories/iCustomersRepository";

@injectable()
class ShowCustomerService {
  private customerRepository: iCustomersRepository;

  constructor(
    @inject("CustomerRepository")
    customerRepository: iCustomersRepository
  ) {
    this.customerRepository = customerRepository;
  }

  public async execute({ id }: IShowCustomer) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new AppError("Customer not found", 404);
    }
    return customer;
  }
}

export default ShowCustomerService;
