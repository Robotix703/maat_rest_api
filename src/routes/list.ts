import express from "express";

import { listController } from "../controllers/list";

import checkAuth from "../middleware/check-auth";

export const listRoutes = express.Router();

//GET
listRoutes.get("/", checkAuth, listController.readLists);
listRoutes.get("/byId", checkAuth, listController.getListById);

//POST
listRoutes.post("/", checkAuth, listController.writeList);

//PUT
listRoutes.put("/:id", checkAuth, listController.updateList);

//DELETE
listRoutes.delete("/:id", checkAuth, listController.deleteList);