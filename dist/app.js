"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const userRouter_1 = __importDefault(require("./user/userRouter"));
const httpStatusCodes_1 = __importDefault(require("./utils/httpStatusCodes"));
const bookRouter_1 = __importDefault(require("./book/bookRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    res.status(httpStatusCodes_1.default.BAD_REQUEST).json({ status: "Healthy" });
});
app.use("/api/users", userRouter_1.default);
app.use("/api/books", bookRouter_1.default);
// Global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
