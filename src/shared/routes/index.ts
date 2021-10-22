import { Router } from "express";
import productsRouter from "@modules/products/routes/product_routes";
import usersRouter from "@modules/users/routes/user_routes";
import sessionsRouter from "@modules/users/routes/session_routes";
import passwordRouter from "@modules/users/routes/password_routes";
import userProfileRouter from "@modules/users/routes/user_profile_routes";
import customersRouter from "@modules/customers/routes/customer_routes";
import ordersRouter from "@modules/orders/routes/order_routes";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/login", sessionsRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", userProfileRouter);
routes.use("/customers", customersRouter);
routes.use("/orders", ordersRouter);

export default routes;
