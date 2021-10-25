import RedisCache from "@shared/cache/redis_cache";
import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/products_repository";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public static async execute({ id, name, price, quantity }: IRequest) {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    const productExists = await productsRepository.findByName(name);
    if (productExists && productExists.name !== name) {
      throw new AppError("There is already a product with that name");
    }

    const redisCache = new RedisCache();
    await redisCache.invalidate("sales-api-PRODUCTS_LIST");

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    await productsRepository.save(product);
    return product;
  }
}

export default UpdateProductService;
