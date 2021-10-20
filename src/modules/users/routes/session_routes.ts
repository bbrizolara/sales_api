import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import sessionsController from "../controllers/sessions_controller";

const sessionsRouter = Router();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create
);

export default sessionsRouter;
