import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/is_authenticated";
import userProfileController from "../controllers/user_profile_controller";

const userProfileRouter = Router();

userProfileRouter.use(isAuthenticated);

userProfileRouter.get("/", userProfileController.show);

userProfileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().optional(),
      passwordConfirmation: Joi.string()
        .valid(Joi.ref("password"))
        .when("password", {
          is: Joi.exist(),
          then: Joi.required(),
        }),
      oldPassword: Joi.string().when("password", {
        is: Joi.exist(),
        then: Joi.required(),
      }),
    },
  }),
  userProfileController.update
);

export default userProfileRouter;
