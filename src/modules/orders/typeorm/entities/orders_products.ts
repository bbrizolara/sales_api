import Customer from "@modules/customers/typeorm/entities/customer";
import Product from "@modules/products/typeorm/entities/product";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Order from "./order";

@Entity("orders_products")
class OrdersProducts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("decimal")
  price: number;

  @Column("int")
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn({ name: "orderId" })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column()
  orderId: string;

  @Column()
  productId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
