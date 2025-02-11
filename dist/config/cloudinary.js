"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBookPdfToCloudinary = exports.uploadBookCoversToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("./config"));
const node_fs_1 = __importDefault(require("node:fs"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinaryCloudName,
    api_key: config_1.default.cloudinaryApiKey,
    api_secret: config_1.default.cloudinaryApiSecret,
});
const uploadBookCoversToCloudinary = async (path, filename) => {
    if (!path)
        return false;
    try {
        const result = await cloudinary_1.v2.uploader.upload(path, {
            folder: "Book-covers",
            filename_override: filename,
        });
        await node_fs_1.default.promises.unlink(path);
        return result.secure_url;
    }
    catch (error) {
        console.log("Error while uploading book pdf", error);
        await node_fs_1.default.promises.unlink(path);
        return false;
    }
};
exports.uploadBookCoversToCloudinary = uploadBookCoversToCloudinary;
const uploadBookPdfToCloudinary = async (path, filename) => {
    if (!path)
        return false;
    try {
        const result = await cloudinary_1.v2.uploader.upload(path, {
            folder: "Book-PDFs",
            format: "pdf",
            filename_override: filename,
        });
        await node_fs_1.default.promises.unlink(path);
        return result.secure_url;
    }
    catch (error) {
        console.log("Error while uploading book pdf", error);
        await node_fs_1.default.promises.unlink(path);
        return false;
    }
};
exports.uploadBookPdfToCloudinary = uploadBookPdfToCloudinary;
