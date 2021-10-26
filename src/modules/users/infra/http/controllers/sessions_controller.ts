import { Request, Response } from "express";
import CreateSessionsService from "../../../services/create_sessions_service";
import { classToClass } from "class-transformer";
import { container } from "tsyringe";

class SessionsController {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const createSession = container.resolve(CreateSessionsService);
    const user = await createSession.execute({
      email,
      password,
    });
    return res.status(200).json(classToClass(user));
  }
}

export default new SessionsController();
