import { Request, Response } from "express";
import { IDeleteOne, IUpdateOne } from "../models/mongoose";
import { IList, IPrettyList } from "../models/list";

import { baseList } from "../compute/base/list";
import { computeList } from "../compute/computeList";

export namespace listController {
  //POST
  export async function writeList(req: any, res: any){
    return baseList.register(
      req.body.name,
      req.body.main as boolean,
      req.body.total0,
      req.body.total1,
      req.body.balance0,
      req.body.balance1,
      req.body.merged as boolean
    )
    .then((result: IList) => {
      if(!result) res.status(500).json({ errorMessage: "No list created" });

      res.status(201).json(result);
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error.message
      });
    });
  }

  //GET
  export async function readLists(req: any, res: any){
    const fetchedLists: IList[] | void = await baseList.getAllLists()
    .catch(error => {
      res.status(500).json({ errorMessage: error.message });
      return;
    });
    if(!fetchedLists){
      res.status(500).json({ errorMessage: "List not found" });
      return;
    }

    const count = await baseList.count()
    .catch(error => {
      res.status(500).json({ errorMessage: error.message });
      return;
    });
    if(!count){
      res.status(500).json({ errorMessage: "List count not found" });
      return;
    }
    
    res.status(200).json({
      lists: fetchedLists,
      count: count
    });
  }
  export async function getListById(req: any, res: any){
    return computeList.getPrettyListById(req.query.listId)
    .then((result: IPrettyList) => {
      if(!result) res.status(500).json({ errorMessage: "No list created" });
      
      res.status(201).json(result);
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error.message
      })
    });
  }

  //PUT
  export async function updateList(req: any, res: any){
    return baseList.update(
      req.params.id,
      req.body.name,
      req.body.main as boolean,
      req.body.total0,
      req.body.total1,
      req.body.balance0,
      req.body.balance1,
      req.body.merged as boolean
    )
    .then((result: IUpdateOne) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({status: "OK"});
      } else {
        res.status(401).json({message: "Pas de modification"});
      }
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error.message
      })
    });
  }

  //DELETE
  export async function deleteList(req: any, res: any){
    return baseList.deleteOne(req.params.id)
    .then((result: IDeleteOne) => {
      if (result.deletedCount > 0) {
        res.status(200).json(result);
      } else {
        res.status(500).json({errorMessage: "No modification"});
      }
    })
    .catch((error: Error) => {
      res.status(500).json({
        errorMessage: error.message
      })
    });
  }
}