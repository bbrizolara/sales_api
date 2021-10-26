import AppError from "@shared/errors/app_error";
import { inject, injectable } from "tsyringe";
import { IUpdateCustomer } from "../domain/models/iUpdateCustomer";
import { iCustomersRepository } from "../domain/repositories/iCustomersRepository";
import { CustomerBaseService } from "./customer_base_services";

@injectable()
class UpdateCustomerService extends CustomerBaseService {
  constructor(customerRepository: iCustomersRepository) {
    super(customerRepository);
  }

  public async execute({ id, name, email }: IUpdateCustomer) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    const emailExists = await this.customerRepository.findByEmail(email);
    if (emailExists && email !== customer.email) {
      throw new AppError("Email is already in use");
    }

    customer.name = name;
    customer.email = email;
    await this.customerRepository.save(customer);
    return customer;
  }
}

export default UpdateCustomerService;
