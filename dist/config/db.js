"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const connectDB = async () => {
    try {
        mongoose_1.default.connection.on("connected", () => {
            console.log(`Connected to DB`);
        });
        mongoose_1.default.connection.on("error", (err) => {
            console.log("Error while connecting to DB", err);
        });
        await mongoose_1.default.connect(config_1.default.mongoUri);
    }
    catch (error) {
        console.log("Failed to connect to DB: ", error);
        process.exit(1);
    }
};
exports.default = connectDB;
