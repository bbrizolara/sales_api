import { EntityRepository, In, Repository } from "typeorm";
import Product from "../entities/product";

interface IFindAllByIds {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string) {
    return await this.findOne({
      where: {
        name,
      },
    });
  }

  public async findAllByIds(products: IFindAllByIds[]) {
    const productIds = products.map((product) => product.id);
    const productsExist = await this.find({
      where: {
        id: In(productIds),
      },
    });
    return productsExist;
  }
}
