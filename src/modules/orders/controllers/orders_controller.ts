import { Request, Response } from "express";
import CreateOrderService from "../services/create_order_service";
import ShowOrderService from "../services/show_order_service";

class OrderController {
  public async create(req: Request, res: Response) {
    const { customerId, products } = req.body;
    const order = await CreateOrderService.execute({ customerId, products });
    return res.status(201).json(order);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    const order = await ShowOrderService.execute({ id });
    return res.status(200).json(order);
  }
}

export default new OrderController();
