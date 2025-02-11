"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("./bookController");
const bookRouter = (0, express_1.Router)();
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
// prefix - api/books
bookRouter.post("/", multer_middleware_1.default.fields([
    { name: "file", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
]), bookController_1.createBook);
exports.default = bookRouter;
