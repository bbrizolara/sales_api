import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../typeorm/repositories/customer_repository";

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public static async execute({ id }: IRequest) {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    await customerRepository.remove(customer);
    return true;
  }
}

export default DeleteCustomerService;
