import { Router } from "express";
import { createBook } from "./bookController";
const bookRouter = Router();
import upload from "../middlewares/multer.middleware";

// prefix - api/books
bookRouter.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
