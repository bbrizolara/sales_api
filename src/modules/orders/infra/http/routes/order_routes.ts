import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ordersController from "../controllers/orders_controller";
import rateLimiter from "@shared/infra/http/middlewares/rate_limiter";

const ordersRouter = Router();

ordersRouter.use(rateLimiter);

ordersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      customerId: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create
);

ordersRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show
);

export default ordersRouter;
