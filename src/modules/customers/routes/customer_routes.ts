import { Router } from "express";
import customersController from "../controllers/customers_controller";
import { celebrate, Joi, Segments, errors } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/is_authenticated";
import rateLimiter from "@shared/http/middlewares/rate_limiter";

const customersRouter = Router();

customersRouter.use(rateLimiter);

customersRouter.get("/", isAuthenticated, customersController.index);

customersRouter.get(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.show
);

customersRouter.post(
  "/",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customersController.create
);

customersRouter.put(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customersController.update
);

customersRouter.delete(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.delete
);

export default customersRouter;
