import { NextFunction, Request, Response } from "express";

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const catchErrors =
  (controller: Controller) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      return await controller(req, res, next);
    } catch (error) {
      return next(error);
    }
  };

export default catchErrors;
