import IPaginate from "@shared/utils/pagination";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../infra/typeorm/repositories/products_repository";

class ListProductsService {
  public static async execute() {
    const productsRepository = getCustomRepository(ProductRepository);
    const products = await productsRepository.createQueryBuilder().paginate();
    return products as IPaginate;
  }
}

export default ListProductsService;
