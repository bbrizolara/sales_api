import AppError from "@shared/errors/app_error";
import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  keyGenerator: (req: Request): string => req.ip,
  handler(_, res: Response): void {
    res.status(429).send(new AppError("Too many request", 429));
  },
});

export default rateLimiter;
