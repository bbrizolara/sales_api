import { Request, Response } from "express";
import ShowUserService from "../../../services/show_user_service";
import UpdateUserService from "../../../services/update_user_service";
import { classToClass } from "class-transformer";
import { container } from "tsyringe";

class UserProfileController {
  public async show(req: Request, res: Response) {
    const id = req.user.id;
    const showUser = container.resolve(ShowUserService);
    const user = await showUser.execute({
      id,
    });
    return res.status(200).json(classToClass(user));
  }

  public async update(req: Request, res: Response) {
    const id = req.user.id;
    const { name, password, oldPassword } = req.body;
    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute({
      id,
      name,
      password,
      oldPassword,
    });
    return res.status(200).json(classToClass(user));
  }
}

export default new UserProfileController();
