import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import userController from "../controllers/user_controller";

const usersRouter = Router();

usersRouter.get("/", userController.index);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create
);

usersRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.show
);

export default usersRouter;
