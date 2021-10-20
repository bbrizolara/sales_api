import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { errors } from "celebrate";
import cors from "cors";
import routes from "../routes";
import AppError from "@shared/errors/app_error";
import "@shared/typeorm";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 500,
    message: "Internal server error",
  });
});

app.listen(3000, () => {
  console.log("Server started!");
});
