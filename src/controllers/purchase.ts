import { Request, Response } from "express";
import { IUpdateOne } from "../models/mongoose";

import { basePurchase } from "../compute/base/purchase";
import { baseList } from "../compute/base/list";
import { IPurchase } from "../models/purchase";
import { IList } from "../models/list";

export namespace purchaseController {
  //POST
  export async function writePurchase(req: Request, res: Response){
    basePurchase.register(
        req.body.title,
        req.body.amount,
        req.body.date,
        req.body.buyTo,
        req.body.from,
        req.body.listId,
        req.body.total0,
        req.body.total1,
        req.body.balance0,
        req.body.balance1
    )
    .then((result: any) => {
      res.status(201).json(result);
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error
      })
    });
  }

  //GET
  export async function readPurchases(req: any, res: Response){
    if(!req.query.listId){
      res.status(500).json({
        errorMessage: "No listId provided"
      });
      return;
    }

    let fetchedPurchases: IPurchase[] | void = await basePurchase.getPurchasesByListId(req.query.listId)
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error
      });
      return;
    });

    let list: IList | void = await baseList.getListById(req.query.listId)
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error
      })
      return;
    });

    if(!list){
      res.status(500).json({
        errorMessage: "List id not found"
      });
      return;
    }

    let data = {
      listName: list.name,
      purchases: fetchedPurchases
    }
    res.status(200).json(data);
  }

  //PUT
  export async function updatePurchase(req: Request, res: Response){
    
    basePurchase.update(
        req.params.id,
        req.body.title,
        req.body.amount,
        req.body.date,
        req.body.buyTo,
        req.body.from,
        req.body.listId,
        req.body.total0,
        req.body.total1,
        req.body.balance0,
        req.body.balance1
    )
    .then((result: IUpdateOne) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({status: "OK"});
      } else {
        res.status(401).json({ message: "Pas de modification" });
      }
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error
      })
    });
  }

  //DELETE
  export async function deletePurchase(req: Request, res: Response){
    basePurchase.deleteOne(req.params.id)
    .then((result: any) => {
      if (result.deletedCount > 0) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error
      })
    });
  }
}