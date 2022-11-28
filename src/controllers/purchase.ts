import { Request, Response } from "express";
import { IUpdateOne } from "../models/mongoose";

import { basePurchase } from "../compute/base/purchase";
import { baseList } from "../compute/base/list";

import { computePurchase } from "../compute/computePurchase";

import { IPrettyPurchase, ISendPurchaseData } from "../models/purchase";
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
  export async function addPurchase(req: Request, res: Response){
    let data : ISendPurchaseData = {
      title: req.body.title,
      amount: req.body.amount,
      buyTo: req.body.buyTo,
      from: req.body.from,
      listId: req.body.listId
    };

    computePurchase.add(data)
    .then((result: any) => {
      if(result.status === "OK"){
        res.status(200).json({status: "OK"});
      }else{
        res.status(500).json(result);
      }
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error
      })
      return;
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

    computePurchase.getPurchasesByListId(req.query.listId)
    .then((result: IPrettyPurchase[]) => {
      res.status(200).json(result);
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error
      });
      return;
    });
  }
  export async function readPurchase(req: any, res: Response){
    if(!req.query.purchaseId){
      res.status(500).json({
        errorMessage: "No purchaseId provided"
      });
      return;
    }

    computePurchase.getPurchasesByPurchaseId(req.query.purchaseId)
    .then((result: IPrettyPurchase) => {
      res.status(200).json(result);
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error
      });
      return;
    });
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