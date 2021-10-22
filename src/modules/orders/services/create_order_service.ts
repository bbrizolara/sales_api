import { CustomerRepository } from "@modules/customers/typeorm/repositories/customer_repository";
import Product from "@modules/products/typeorm/entities/product";
import { ProductRepository } from "@modules/products/typeorm/repositories/products_repository";
import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { OrderRepository } from "../typeorm/repositories/orders_repository";

interface IRequest {
  customerId: string;
  products: IProduct[];
}

interface IProduct {
  id: string;
  quantity: number;
}

class CreateOrderService {
  public static async execute({ customerId, products }: IRequest) {
    const ordersRepository = getCustomRepository(OrderRepository);
    const customersRepository = getCustomRepository(CustomerRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    //validate customer
    const customer = await customersRepository.findById(customerId);
    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    //validate existing products
    const existingProducts = await productsRepository.findAllByIds(products);
    if (!existingProducts.length) {
      throw new AppError("Products not found", 404);
    }

    const existingProductsId = existingProducts.map((product) => product.id);
    const inexistentProducts = products.filter(
      (product) => !existingProductsId.includes(product.id)
    );
    if (inexistentProducts.length) {
      throw new AppError(`Product ${inexistentProducts[0].id} not found`, 404);
    }

    //validate quantity
    const quantityUnavailable = products.filter(
      (product) =>
        existingProducts.filter((p) => p.id === product.id)[0].quantity <
        product.quantity
    );
    if (quantityUnavailable.length) {
      throw new AppError(
        `Quantity ${quantityUnavailable[0].quantity} is not available for product ${quantityUnavailable[0].id}`
      );
    }

    //form products object
    const boughtProducts = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      price: existingProducts.filter((p) => p.id === product.id)[0].price,
    }));

    //create order
    const order = await ordersRepository.createOrder({
      customer,
      products: boughtProducts,
    });

    //update products quantity
    const { orderProducts } = order;
    const productUpdatedQuantity = orderProducts.map((orderProduct) => ({
      id: orderProduct.productId,
      quantity:
        existingProducts.filter((p) => p.id === orderProduct.productId)[0]
          .quantity - orderProduct.quantity,
    }));
    await productsRepository.save(productUpdatedQuantity);
    return order;
  }
}

export default CreateOrderService;
