import RedisCache from "@shared/cache/redis_cache";
import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/products_repository";

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

    const redisCache = new RedisCache();
    await redisCache.invalidate("sales-api-PRODUCTS_LIST");

    await productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
