import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import forgotPasswordController from "../controllers/forgot_password_controller";
import resetPasswordController from "../controllers/reset_password_controller";
import rateLimiter from "@shared/infra/http/middlewares/rate_limiter";

const passwordRouter = Router();

passwordRouter.use(rateLimiter);

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create
);

passwordRouter.post(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref("password")),
    },
  }),
  resetPasswordController.create
);

export default passwordRouter;
