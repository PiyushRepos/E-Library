import { Router } from "express";
import { loginUser, registerUser } from "./userController";
const userRouter = Router();

// prefix - api/users

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
