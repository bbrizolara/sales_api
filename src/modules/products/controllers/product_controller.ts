import { Request, response, Response } from "express";
import CreateProductService from "../services/create_product_services";
import DeleteProductService from "../services/delete_product_service";
import ListProductsService from "../services/list_products_service";
import ShowProductService from "../services/show_product_service";
import UpdateProductService from "../services/update_product_service";

class ProductsController {
  public async index(req: Request, res: Response) {
    const products = await ListProductsService.execute();
    return res.status(200).json(products);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    const product = await ShowProductService.execute({ id });
    return res.status(200).json(product);
  }

  public async create(req: Request, res: Response) {
    const { name, price, quantity } = req.body;
    const product = await CreateProductService.execute({
      name,
      price,
      quantity,
    });
    return res.status(201).json(product);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const product = await UpdateProductService.execute({
      id,
      name,
      price,
      quantity,
    });
    return res.status(200).json(product);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const product = await DeleteProductService.execute({ id });
    return res.status(204);
  }
}

export default new ProductsController();
