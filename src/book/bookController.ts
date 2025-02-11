import createHttpError from "http-errors";
import httpStatusCodes from "../utils/httpStatusCodes";
import catchErrors from "../utils/catchErrors";
import {
  uploadBookCoversToCloudinary,
  uploadBookPdfToCloudinary,
} from "../config/cloudinary";
import Book from "./bookModel";
export const createBook = catchErrors(async (req, res) => {
  const { title, genre } = req.body;

  if ([title, genre].some((field) => !field?.trim())) {
    throw createHttpError(
      httpStatusCodes.BAD_REQUEST,
      "all fields are required"
    );
  }

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const coverImage = files["coverImage"][0];
  const bookPdf = files["file"][0];

  let coverImageUrl = "";
  if (coverImage?.path) {
    const result = await uploadBookCoversToCloudinary(
      coverImage.path,
      coverImage.originalname
    );
    if (result) {
      coverImageUrl = result;
    }
  }

  let bookPdfUrl = "";
  if (bookPdf?.path) {
    const result = await uploadBookPdfToCloudinary(
      bookPdf.path,
      bookPdf.originalname
    );
    if (result) {
      bookPdfUrl = result;
    }
  }
  let newBook;
  try {
    newBook = await Book.create({
      title,
      genre,
      coverImage: coverImageUrl,
      file: bookPdfUrl,
      author: "67a9fd87dca8417ae381d1f4",
    });
  } catch (error) {
    console.log("Error while creating book", error);
    throw createHttpError(
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      "Error while adding creating book"
    );
  }

  res.status(httpStatusCodes.CREATED).json({
    message: "Book created successfully",
    bookId: newBook._id,
  });
});
