"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const httpStatusCodes_1 = __importDefault(require("../utils/httpStatusCodes"));
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const cloudinary_1 = require("../config/cloudinary");
const bookModel_1 = __importDefault(require("./bookModel"));
exports.createBook = (0, catchErrors_1.default)(async (req, res) => {
    const { title, genre } = req.body;
    if ([title, genre].some((field) => !field?.trim())) {
        throw (0, http_errors_1.default)(httpStatusCodes_1.default.BAD_REQUEST, "all fields are required");
    }
    const files = req.files;
    const coverImage = files["coverImage"][0];
    const bookPdf = files["file"][0];
    let coverImageUrl = "";
    if (coverImage?.path) {
        const result = await (0, cloudinary_1.uploadBookCoversToCloudinary)(coverImage.path, coverImage.originalname);
        if (result) {
            coverImageUrl = result;
        }
    }
    let bookPdfUrl = "";
    if (bookPdf?.path) {
        const result = await (0, cloudinary_1.uploadBookPdfToCloudinary)(bookPdf.path, bookPdf.originalname);
        if (result) {
            bookPdfUrl = result;
        }
    }
    let newBook;
    try {
        newBook = await bookModel_1.default.create({
            title,
            genre,
            coverImage: coverImageUrl,
            file: bookPdfUrl,
            author: "67a9fd87dca8417ae381d1f4",
        });
    }
    catch (error) {
        console.log("Error while creating book", error);
        throw (0, http_errors_1.default)(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR, "Error while adding creating book");
    }
    res.status(httpStatusCodes_1.default.CREATED).json({
        message: "Book created successfully",
        bookId: newBook._id,
    });
});
