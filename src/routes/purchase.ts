import express from "express";

import { purchaseController } from "../controllers/purchase";

import checkAuth from "../middleware/check-auth";

export const purchaseRoutes = express.Router();

//GET
purchaseRoutes.get("/", checkAuth, purchaseController.readPurchases);

//POST
purchaseRoutes.post("/", checkAuth, purchaseController.writePurchase);
purchaseRoutes.post("/add", checkAuth, purchaseController.addPurchase);

//PUT
purchaseRoutes.put("/:id", checkAuth, purchaseController.updatePurchase);

//DELETE
purchaseRoutes.delete("/:id", checkAuth, purchaseController.deletePurchase);