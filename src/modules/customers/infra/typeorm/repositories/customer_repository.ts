import { ICreateCustomer } from "@modules/customers/domain/models/iCreateCustomer";
import { ICustomer } from "@modules/customers/domain/models/iCustomer";
import { iCustomersRepository } from "@modules/customers/domain/repositories/iCustomersRepository";
import IPaginate from "@shared/utils/pagination";
import { getRepository, Repository } from "typeorm";
import Customer from "../entities/customer";

export class CustomerRepository implements iCustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findByName(name: string) {
    return await this.ormRepository.findOne({
      where: {
        name,
      },
    });
  }

  public async findByEmail(email: string) {
    return await this.ormRepository.findOne({
      where: {
        email,
      },
    });
  }

  public async findById(id: string) {
    return await this.ormRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async create({ name, email }: ICreateCustomer) {
    const customer = this.ormRepository.create({
      name,
      email,
    });
    await this.ormRepository.save(customer);
    return customer;
  }

  public async save(customer: ICustomer) {
    await this.ormRepository.save(customer);
    return customer;
  }

  public async remove(customer: ICustomer) {
    await this.ormRepository.remove(customer);
  }

  public async findAllPaginate() {
    const customers = await this.ormRepository.createQueryBuilder().paginate();
    return customers as IPaginate;
  }
}
