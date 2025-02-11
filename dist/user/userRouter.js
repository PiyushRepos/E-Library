"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./userController");
const userRouter = (0, express_1.Router)();
// prefix - api/users
userRouter.post("/register", userController_1.registerUser);
userRouter.post("/login", userController_1.loginUser);
exports.default = userRouter;
