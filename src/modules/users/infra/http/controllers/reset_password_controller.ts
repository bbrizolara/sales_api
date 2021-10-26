import { Request, Response } from "express";
import ResetPasswordService from "../../../services/reset_password_service";

class ResetPasswordController {
  public async create(req: Request, res: Response) {
    const { token, password } = req.body;
    const user = ResetPasswordService.execute({
      token,
      password,
    });
    return res.status(204).json();
  }
}

export default new ResetPasswordController();
