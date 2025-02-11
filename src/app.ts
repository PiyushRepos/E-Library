import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import httpStatusCodes from "./utils/httpStatusCodes";
import bookRouter from "./book/bookRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(httpStatusCodes.BAD_REQUEST).json({ status: "Healthy" });
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
