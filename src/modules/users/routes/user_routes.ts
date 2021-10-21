import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import userController from "../controllers/user_controller";
import userAvatarController from "../controllers/user_avatar_controller";
import isAuthenticated from "@shared/http/middlewares/is_authenticated";
import multer from "multer";
import uploadConfig from "@config/upload";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get("/", isAuthenticated, userController.index);

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

usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRouter;
