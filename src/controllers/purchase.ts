import { Request, Response } from "express";
import { IDeleteOne, IStatus, IUpdateOne } from "../models/mongoose";

import { basePurchase } from "../compute/base/purchase";

import { computePurchase } from "../compute/computePurchase";

import { IPrettyPurchase, IPurchase, ISendPurchaseData } from "../models/purchase";

export namespace purchaseController {
  //POST
  export async function writePurchase(req: any, res: any){
    return basePurchase.register(
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
    .then((result: IPurchase) => {
      if(!result) res.status(500).json({errorMessage: "No purchase found"});

      res.status(201).json(result);
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error.message
      });
    });
  }
  export async function addPurchase(req: any, res: any){
    const data : ISendPurchaseData = {
      title: req.body.title,
      amount: req.body.amount,
      buyTo: req.body.buyTo,
      from: req.body.from,
      listId: req.body.listId
    };

    return computePurchase.add(data)
    .then((result: IStatus) => {
      if(result.status === "OK"){
        res.status(200).json(result);
      }else{
        res.status(500).json(result);
      }
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error.message
      })
    });
  }

  //GET
  export async function readPurchases(req: any, res: any){
    if(!req.query.listId){
      res.status(500).json({errorMessage: "No listId provided"});
      return;
    }

    return computePurchase.getPurchasesByListId(req.query.listId)
    .then((result: IPrettyPurchase[]) => {
      if(!result) res.status(500).json({errorMessage: "No purchase found"});

      res.status(200).json(result);
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error.message
      });
    });
  }
  export async function readPurchase(req: any, res: any){
    if(!req.query.purchaseId){
      res.status(500).json({errorMessage: "No purchaseId provided"});
      return;
    }

    return computePurchase.getPurchasesByPurchaseId(req.query.purchaseId)
    .then((result: IPrettyPurchase) => {
      if(!result) res.status(500).json({errorMessage: "No purchase found"});

      res.status(200).json(result);
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error.message
      });
    });
  }

  //PUT
  export async function updatePurchase(req: any, res: any){
    return basePurchase.update(
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
      if (result.modifiedCount > 0) res.status(200).json({status: "OK"});
      else res.status(401).json({message: "Pas de modification"});
    })
    .catch((error: Error) => {
      res.status(500).json({errorMessage: error.message});
    });
  }
  export async function updatePrettyPurchase(req: any, res: any){
    return computePurchase.updatePrettyPurchase({
      id: req.params.id,
      title: req.body.title,
      amount: req.body.amount,
      buyTo: req.body.buyTo,
      from: req.body.from
    })
    .then((result: IUpdateOne) => {
      if (result.modifiedCount > 0) res.status(200).json({status: "OK"});
      else res.status(401).json({ message: "Pas de modification" });
    })
    .catch((error: Error) => {
      res.status(500).json({errorMessage: error.message});
    });
  }

  //DELETE
  export async function deletePurchase(req: any, res: any){
    return basePurchase.deleteOne(req.params.id)
    .then((result: IDeleteOne) => {
      if (result.deletedCount > 0) res.status(200).json(result);
      else res.status(500).json({errorMessage: "No modification"});
    })
    .catch((error: Error) => {
      res.status(500).json({errorMessage: error.message});
    });
  }
}