import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/products_repository";
import redisCache from "@shared/cache/redis_cache";
import Product from "../typeorm/entities/product";

class ListProductsService {
  public static async execute() {
    const productsRepository = getCustomRepository(ProductRepository);

    let products = await redisCache.recover<Product[]>(
      "sales-api-PRODUCTS_LIST"
    );

    if (!products) {
      products = await productsRepository.find();
      await redisCache.save("sales-api-PRODUCTS_LIST", products);
    }

    return products;
  }
}

export default ListProductsService;
