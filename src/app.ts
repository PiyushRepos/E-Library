import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ status: "Healthy" });
});

// Global error handler
app.use(globalErrorHandler);

export default app;
