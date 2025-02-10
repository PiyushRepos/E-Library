import createHttpError from "http-errors";
import catchErrors from "../utils/catchErrors";
import httpStatusCodes from "../utils/httpStatusCodes";

export const registerUser = catchErrors(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw createHttpError(
      httpStatusCodes.BAD_REQUEST,
      "All fields are required"
    );
  }

  res.status(201).json({ name, email, password });
});
