import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { OrderRepository } from "../infra/typeorm/repositories/orders_repository";

interface IRequest {
  id: string;
}

class ShowOrderService {
  public static async execute({ id }: IRequest) {
    const ordersRepository = getCustomRepository(OrderRepository);
    const order = ordersRepository.findById(id);
    if (!order) {
      throw new AppError("Order not found", 404);
    }
    return order;
  }
}

export default ShowOrderService;
