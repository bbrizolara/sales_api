import { Request, Response } from "express";
import { container } from "tsyringe";
import ResetPasswordService from "../../../services/reset_password_service";

class ResetPasswordController {
  public async create(req: Request, res: Response) {
    const { token, password } = req.body;
    const resetPassword = container.resolve(ResetPasswordService);
    const user = resetPassword.execute({
      token,
      password,
    });
    return res.status(204).json();
  }
}

export default new ResetPasswordController();
