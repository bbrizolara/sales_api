import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../infra/typeorm/repositories/products_repository";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public static async execute({ name, price, quantity }: IRequest) {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);
    if (productExists) {
      throw new AppError("Product already exists");
    }
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });
    await productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
