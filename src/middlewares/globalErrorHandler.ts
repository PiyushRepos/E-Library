import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import config from "../config/config";

const globalErrorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    status: statusCode,
    message: error.message || "Oops, Something Went Wrong !!",
    errorStack: config.nodeEnv == "development" ? error.stack : "",
  });
};

export default globalErrorHandler;
