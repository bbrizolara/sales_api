import AppError from "@shared/errors/app_error";
import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";
import authConfig from "@config/auth";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("Unauthorized", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret);
    const { sub } = decodedToken as ITokenPayload;
    req.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError("Unauthorized", 401);
  }
};

export default isAuthenticated;
