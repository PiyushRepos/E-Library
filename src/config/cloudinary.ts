import { v2 as cloudinary } from "cloudinary";
import config from "./config";
import fs from "node:fs";

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

const uploadBookCoversToCloudinary = async (path: string, filename: string) => {
  if (!path) return false;
  try {
    const result = await cloudinary.uploader.upload(path, {
      folder: "Book-covers",
      filename_override: filename,
    });
    await fs.promises.unlink(path);
    return result.secure_url;
  } catch (error) {
    console.log("Error while uploading book pdf", error);
    await fs.promises.unlink(path);
    return false;
  }
};

const uploadBookPdfToCloudinary = async (path: string, filename: string) => {
  if (!path) return false;
  try {
    const result = await cloudinary.uploader.upload(path, {
      folder: "Book-PDFs",
      format: "pdf",
      filename_override: filename,
    });
    await fs.promises.unlink(path);
    return result.secure_url;
  } catch (error) {
    console.log("Error while uploading book pdf", error);
    await fs.promises.unlink(path);
    return false;
  }
};

export { uploadBookCoversToCloudinary, uploadBookPdfToCloudinary };
