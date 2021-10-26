import AppError from "@shared/errors/app_error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";
import { request } from "http";

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
    const decodedToken = verify(token, authConfig.secret);
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
