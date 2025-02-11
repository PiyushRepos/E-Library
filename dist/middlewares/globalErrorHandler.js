"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const globalErrorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        status: statusCode,
        message: error.message || "Oops, Something Went Wrong !!",
        errorStack: config_1.default.nodeEnv == "development" ? error.stack : "",
    });
};
exports.default = globalErrorHandler;
