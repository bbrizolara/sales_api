import { Request, Response } from "express";
import UpdateUserAvatarService from "../../../services/update_user_avatar_service";
import { classToClass } from "class-transformer";
import { container } from "tsyringe";

class UserAvatarController {
  public async update(req: Request, res: Response) {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = updateUserAvatar.execute({
      id: req.user.id,
      avatarFileName: req.file?.filename || "",
    });
    return res.status(200).json(classToClass(user));
  }
}

export default new UserAvatarController();
