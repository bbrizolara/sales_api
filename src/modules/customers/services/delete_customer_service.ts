import AppError from "@shared/errors/app_error";
import { inject, injectable } from "tsyringe";
import { IDeleteCustomer } from "../domain/models/iDeleteCustomer";
import { iCustomersRepository } from "../domain/repositories/iCustomersRepository";

@injectable()
class DeleteCustomerService {
  private customerRepository: iCustomersRepository;
  constructor(
    @inject("CustomerRepository")
    customerRepository: iCustomersRepository
  ) {
    this.customerRepository = customerRepository;
  }

  public async execute({ id }: IDeleteCustomer) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    await this.customerRepository.remove(customer);
    return true;
  }
}

export default DeleteCustomerService;
