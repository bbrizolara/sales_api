import { Router } from "express";
import productsController from "../controllers/product_controller";
import { celebrate, Joi, Segments, errors } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/is_authenticated";
import rateLimiter from "@shared/http/middlewares/rate_limiter";

const productsRouter = Router();

productsRouter.use(rateLimiter);

productsRouter.get("/", isAuthenticated, productsController.index);

productsRouter.get(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show
);

productsRouter.post(
  "/",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create
);

productsRouter.put(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.update
);

productsRouter.delete(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete
);

export default productsRouter;
