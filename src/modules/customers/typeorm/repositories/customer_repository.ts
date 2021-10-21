import { EntityRepository, Repository } from "typeorm";
import Customer from "../entities/customer";

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  public async findByName(name: string) {
    return await this.findOne({
      where: {
        name,
      },
    });
  }

  public async findByEmail(email: string) {
    return await this.findOne({
      where: {
        email,
      },
    });
  }

  public async findById(id: string) {
    return await this.findOne({
      where: {
        id,
      },
    });
  }
}
