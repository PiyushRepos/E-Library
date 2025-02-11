import { User } from "../user/userTypes";
import { Document } from "mongoose";

export interface BookDocument extends Document {
  title: string;
  author: User;
  genre: string;
  coverImage: string;
  _id: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
}
