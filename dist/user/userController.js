"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const httpStatusCodes_1 = __importDefault(require("../utils/httpStatusCodes"));
const userModel_1 = __importDefault(require("./userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.registerUser = (0, catchErrors_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    // validation
    if ([name, email, password].some((field) => field?.trim())) {
        throw (0, http_errors_1.default)(httpStatusCodes_1.default.BAD_REQUEST, "all fields are required");
    }
    // check if user is already exists
    const isUserExists = await userModel_1.default.findOne({ email });
    if (isUserExists) {
        throw (0, http_errors_1.default)(httpStatusCodes_1.default.CONFLICT, "user already exists with this email");
    }
    // create user
    const newUser = await userModel_1.default.create({
        name,
        email,
        password,
    });
    // token generation using JWT
    let token;
    try {
        token = jsonwebtoken_1.default.sign({ userId: newUser._id }, config_1.default.jwtSecret, {
            expiresIn: "7d",
        });
    }
    catch (error) {
        throw (0, http_errors_1.default)(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR, "error while generating token");
    }
    res
        .status(httpStatusCodes_1.default.CREATED)
        .json({ message: "user registered successfully", accessToken: token });
});
exports.loginUser = (0, catchErrors_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if ([email, password].some((field) => !field?.trim())) {
        throw (0, http_errors_1.default)(httpStatusCodes_1.default.BAD_REQUEST, "all fields are required");
    }
    const user = await userModel_1.default.findOne({ email });
    if (!user) {
        throw (0, http_errors_1.default)(httpStatusCodes_1.default.NOT_FOUND, "user not found with this email");
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw (0, http_errors_1.default)(httpStatusCodes_1.default.BAD_REQUEST, "incorrect password");
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.default.jwtSecret, {
            expiresIn: "7d",
        });
    }
    catch (error) {
        throw (0, http_errors_1.default)(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR, "error while generating token");
    }
    res
        .status(httpStatusCodes_1.default.OK)
        .json({ message: "user loggedIn successfully", accessToken: token });
});
