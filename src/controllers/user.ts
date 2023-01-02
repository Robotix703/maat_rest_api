require('dotenv').config();

import { Request, Response } from "express";
import { IPrettyUser, IUser } from "../models/user";

import { baseUser } from "../compute/base/user";

export namespace userController {
  export function userLogin(req: Request, res: Response){
    let fetchUser: IUser;
  
    baseUser.getByName(req.body.userName)
    .then((user: IUser) => {
      fetchUser = user;
  
      if (!user) {
        res.status(401).json({
          message: "Mauvaise Nom"
        });
        return;
      }

      if(fetchUser.api_key == req.body.apiKey){
        res.status(200).json({
          userId: fetchUser._id,
          userNumber: fetchUser.number,
          userName: fetchUser.name
        });
      }
      else
      {
        res.status(401).json({
          errorMessage: "Wrong API Key"
        });
      }
    })
    .catch((error: Error) => {
      res.status(401).json({
        errorMessage: error.message
      });
    });
  }

  export function getAllUser(req: Request, res: Response){
    baseUser.getPrettyUsers()
    .then((data: IPrettyUser[]) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      return res.status(401).json({
        errorMessage: error.message
      });
    });
  }
}