import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCustomerService from "../../../services/create_customer_service";
import DeleteCustomerService from "../../../services/delete_customer_service";
import ListCustomersService from "../../../services/list_customers_service";
import ShowCustomerService from "../../../services/show_customer_service";
import UpdateCustomerService from "../../../services/update_customer_service";

class CustomerController {
  public async index(req: Request, res: Response) {
    const listCustomers = container.resolve(ListCustomersService);
    const customers = await listCustomers.execute();
    return res.status(200).json(customers);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    const showCustomer = container.resolve(ShowCustomerService);
    const customer = await showCustomer.execute({ id });
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
    const updateCustomer = container.resolve(UpdateCustomerService);
    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });
    return res.status(200).json(customer);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteCustomer = container.resolve(DeleteCustomerService);
    await deleteCustomer.execute({ id });
    return res.status(204).json();
  }
}

export default new CustomerController();
