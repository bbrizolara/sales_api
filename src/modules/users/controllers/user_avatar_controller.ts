import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/update_user_avatar_service";

class UserAvatarController {
  public async update(req: Request, res: Response) {
    const user = UpdateUserAvatarService.execute({
      userId: req.user.id,
      avatarFileName: req.file?.filename || "",
    });
    return res.status(200).json(user);
  }
}

export default new UserAvatarController();
