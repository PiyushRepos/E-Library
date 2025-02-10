import createHttpError from "http-errors";
import catchErrors from "../utils/catchErrors";
import httpStatusCodes from "../utils/httpStatusCodes";
import User from "./userModel";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const registerUser = catchErrors(async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw createHttpError(
      httpStatusCodes.BAD_REQUEST,
      "All fields are required"
    );
  }

  // check if user is already exists
  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    throw createHttpError(
      httpStatusCodes.CONFLICT,
      "User already exists with this email."
    );
  }

  // create user
  const newUser = await User.create({
    name,
    email,
    password,
  });

  // token generation using JWT
  let token;
  try {
    token = jwt.sign({ userId: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });
  } catch (error) {
    throw createHttpError(
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      "Error while generating token"
    );
  }

  res
    .status(httpStatusCodes.CREATED)
    .json({ message: "User registered successfully", accessToken: token });
});
