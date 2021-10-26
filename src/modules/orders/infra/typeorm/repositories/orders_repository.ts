import Customer from "@modules/customers/infra/typeorm/entities/customer";
import Product from "@modules/products/infra/typeorm/entities/product";
import { EntityRepository, Repository } from "typeorm";
import Order from "../entities/order";

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

interface IProduct {
  productId: string;
  price: number;
  quantity: number;
}

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  public async findById(id: string) {
    return await this.findOne(id, {
      relations: ["customer", "orderProducts"],
    });
  }

  public async createOrder({ customer, products }: IRequest) {
    const order = this.create({
      customer,
      orderProducts: products,
    });
    await this.save(order);
    return order;
  }
}
