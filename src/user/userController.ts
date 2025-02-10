import createHttpError from "http-errors";
import catchErrors from "../utils/catchErrors";
import httpStatusCodes from "../utils/httpStatusCodes";
import User from "./userModel";

export const registerUser = catchErrors(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw createHttpError(
      httpStatusCodes.BAD_REQUEST,
      "All fields are required"
    );
  }

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    throw createHttpError(
      httpStatusCodes.CONFLICT,
      "User already exists with this email."
    );
  }

  res.status(201).json({ name, email, password });
});
