import express from "express";
import checkAuth from "../middleware/check-auth";

import { userController } from "../controllers/user";

export const userRoutes = express.Router();

userRoutes.post("/signup", userController.createUser);
userRoutes.post("/login", userController.userLogin);
userRoutes.get("/all", checkAuth, userController.getAllUser);