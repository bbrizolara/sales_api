import { Request, Response } from "express";
import CreateSessionsService from "../services/create_sessions_service";

class SessionsController {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await CreateSessionsService.execute({
      email,
      password,
    });
    return res.status(200).json(user);
  }
}

export default new SessionsController();
