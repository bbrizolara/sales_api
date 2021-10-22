import { Request, Response } from "express";
import CreateUserService from "../services/create_users_service";
import ListUsersService from "../services/list_users_service";
import { classToClass } from "class-transformer";

class UserController {
  public async index(req: Request, res: Response) {
    const users = await ListUsersService.execute();
    return res.status(200).json(classToClass(users));
  }

  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await CreateUserService.execute({
      name,
      email,
      password,
    });
    return res.status(201).json(classToClass(user));
  }
}

export default new UserController();
