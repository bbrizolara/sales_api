import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/products_repository";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class ListProductsService {
  public static async execute() {
    const productsRepository = getCustomRepository(ProductRepository);
    const products = await productsRepository.find();
    return products;
  }
}

export default ListProductsService;
