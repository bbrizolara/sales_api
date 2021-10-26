import AppError from "@shared/errors/app_error";
import { inject, injectable } from "tsyringe";
import { ICreateCustomer } from "../domain/models/iCreateCustomer";
import { iCustomersRepository } from "../domain/repositories/iCustomersRepository";

@injectable()
class CreateCustomerService {
  private customerRepository: iCustomersRepository;
  constructor(
    @inject("CustomerRepository")
    customerRepository: iCustomersRepository
  ) {
    this.customerRepository = customerRepository;
  }

  public async execute({ name, email }: ICreateCustomer) {
    const customerExists = await this.customerRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError("Email is already in use");
    }
    const customer = await this.customerRepository.create({
      name,
      email,
    });
    return customer;
  }
}

export default CreateCustomerService;
