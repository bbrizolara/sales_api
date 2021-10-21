import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../typeorm/repositories/customer_repository";

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public static async execute({ name, email }: IRequest) {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customerExists = await customerRepository.findByEmail(email);
    if (customerExists) {
      throw new AppError("Email is already in use");
    }
    const customer = customerRepository.create({
      name,
      email,
    });
    await customerRepository.save(customer);
    return customer;
  }
}

export default CreateCustomerService;
