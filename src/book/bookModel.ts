import mongoose from "mongoose";
import { BookDocument } from "./bookTypes";

const bookSchema = new mongoose.Schema<BookDocument>(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    genre: { type: String, required: true },
    coverImage: { type: String, required: true },
    file: { type: String, required: true },
  },
  { timestamps: true }
);

const Book = mongoose.model<BookDocument>("Book", bookSchema);

export default Book;
