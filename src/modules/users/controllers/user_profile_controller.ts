import { Request, Response } from "express";
import ShowUserService from "../services/show_user_service";
import UpdateUserService from "../services/update_user_service";
import { classToClass } from "class-transformer";

class UserProfileController {
  public async show(req: Request, res: Response) {
    const userId = req.user.id;
    const user = await ShowUserService.execute({
      userId,
    });
    return res.status(200).json(classToClass(user));
  }

  public async update(req: Request, res: Response) {
    const userId = req.user.id;
    const { name, password, oldPassword } = req.body;
    const user = await UpdateUserService.execute({
      userId,
      name,
      password,
      oldPassword,
    });
    return res.status(200).json(classToClass(user));
  }
}

export default new UserProfileController();
