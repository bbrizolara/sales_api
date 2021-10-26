import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../infra/typeorm/repositories/products_repository";

interface IRequest {
  id: string;
}

class ShowProductService {
  public static async execute({ id }: IRequest) {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }
}

export default ShowProductService;
