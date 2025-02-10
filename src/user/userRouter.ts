import { Router } from "express";
import { registerUser } from "./userController";
const userRouter = Router();

// prefix - api/users

userRouter.post("/register", registerUser);

export default userRouter;
