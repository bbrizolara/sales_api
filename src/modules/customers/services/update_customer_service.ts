import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../typeorm/repositories/customer_repository";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public static async execute({ id, name, email }: IRequest) {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    const emailExists = await customerRepository.findByEmail(email);
    if (emailExists && email !== customer.email) {
      throw new AppError("Email is already in use");
    }

    customer.name = name;
    customer.email = email;
    await customerRepository.save(customer);
    return customer;
  }
}

export default UpdateCustomerService;
