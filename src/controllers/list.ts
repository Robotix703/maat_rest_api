import { Request, Response } from "express";
import { IUpdateOne } from "../models/mongoose";

import { IList } from "../models/list";
import { baseList } from "../compute/base/list";

export namespace listController {
  //POST
  export async function writeList(req: Request, res: Response){
    baseList.register(
      req.body.name,
      req.body.main as boolean,
      req.body.total0,
      req.body.total1,
      req.body.balance0,
      req.body.balance1,
      req.body.merged as boolean
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
  export async function readLists(req: any, res: Response){
    let fetchedLists: IList[] | void = await baseList.getAllLists()
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error
      })
      return;
    });

    let count = await baseList.count()
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error
      })
      return;
    });
    
    let data = {
      lists: fetchedLists,
      count: count
    }
    res.status(200).json(data);
  }

  //PUT
  export async function updateList(req: Request, res: Response){
    
    baseList.update(
      req.params.id,
      req.body.name,
      req.body.main,
      req.body.total0,
      req.body.total1,
      req.body.balance0,
      req.body.balance1,
      req.body.merged
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
  export async function deleteList(req: Request, res: Response){
    baseList.deleteOne(req.params.id)
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