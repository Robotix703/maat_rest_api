import express from "express";
import checkAuth from "../middleware/check-auth";

import { userController } from "../controllers/user";

export const userRoutes = express.Router();

//GET
userRoutes.get("/all", checkAuth, userController.getAllUser);

//POST
userRoutes.post("/login", userController.userLogin);