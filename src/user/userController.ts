import createHttpError from "http-errors";
import catchErrors from "../utils/catchErrors";
import httpStatusCodes from "../utils/httpStatusCodes";
import User from "./userModel";
import jwt from "jsonwebtoken";
import config from "../config/config";
import bcrypt from "bcrypt";

export const registerUser = catchErrors(async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if ([name, email, password].some((field) => field?.trim())) {
    throw createHttpError(
      httpStatusCodes.BAD_REQUEST,
      "all fields are required"
    );
  }

  // check if user is already exists
  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    throw createHttpError(
      httpStatusCodes.CONFLICT,
      "user already exists with this email"
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
      "error while generating token"
    );
  }

  res
    .status(httpStatusCodes.CREATED)
    .json({ message: "user registered successfully", accessToken: token });
});

export const loginUser = catchErrors(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => !field?.trim())) {
    throw createHttpError(
      httpStatusCodes.BAD_REQUEST,
      "all fields are required"
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(
      httpStatusCodes.NOT_FOUND,
      "user not found with this email"
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(httpStatusCodes.BAD_REQUEST, "incorrect password");
  }

  let token;
  try {
    token = jwt.sign({ userId: user._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });
  } catch (error) {
    throw createHttpError(
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      "error while generating token"
    );
  }

  res
    .status(httpStatusCodes.OK)
    .json({ message: "user loggedIn successfully", accessToken: token });
});
