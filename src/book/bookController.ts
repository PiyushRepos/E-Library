import createHttpError from "http-errors";
import httpStatusCodes from "../utils/httpStatusCodes";
import catchErrors from "../utils/catchErrors";

export const createBook = catchErrors(async (req, res) => {
  const { title, author, price } = req.body;

  if ([title, author, price].some((field) => !field?.trim())) {
    throw createHttpError(
      httpStatusCodes.BAD_REQUEST,
      "all fields are required"
    );
  }

  res.json({ message: "Book created successfully" });
});
