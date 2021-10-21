import { Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/send_forgot_password_email_service";

class ForgotPasswordController {
  public async create(req: Request, res: Response) {
    const { email } = req.body;
    await SendForgotPasswordEmailService.execute({ email });
    return res.status(204).json();
  }
}

export default new ForgotPasswordController();
