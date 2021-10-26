import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import sessionsController from "../controllers/sessions_controller";
import rateLimiter from "@shared/infra/http/middlewares/rate_limiter";

const sessionsRouter = Router();

sessionsRouter.use(rateLimiter);

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
