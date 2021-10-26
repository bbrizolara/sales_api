import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCustomerService from "../../../services/create_customer_service";
import DeleteCustomerService from "../../../services/delete_customer_service";
import ListCustomersService from "../../../services/list_customers_service";
import ShowCustomerService from "../../../services/show_customer_service";
import UpdateCustomerService from "../../../services/update_customer_service";
import { CustomerRepository } from "../../typeorm/repositories/customer_repository";

class CustomerController {
  public async index(req: Request, res: Response) {
    const customers = await ListCustomersService.execute();
    return res.status(200).json(customers);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    const customer = await ShowCustomerService.execute({ id });
    return res.status(200).json(customer);
  }

  public async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const createCustomer = container.resolve(CreateCustomerService);
    const customer = await createCustomer.execute({
      name,
      email,
    });
    return res.status(201).json(customer);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    const customer = await UpdateCustomerService.execute({
      id,
      name,
      email,
    });
    return res.status(200).json(customer);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await DeleteCustomerService.execute({ id });
    return res.status(204).json();
  }
}

export default new CustomerController();
