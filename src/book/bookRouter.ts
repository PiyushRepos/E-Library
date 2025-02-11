import { Router } from "express";
import { createBook } from "./bookController";
const bookRouter = Router();

// prefix - api/books
bookRouter.post("/", createBook);

export default bookRouter;
