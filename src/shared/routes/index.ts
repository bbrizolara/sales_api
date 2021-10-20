import { Router } from "express";
import productsRouter from "@modules/products/routes/product_routes";
import usersRouter from "@modules/users/routes/user_routes";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);

export default routes;
