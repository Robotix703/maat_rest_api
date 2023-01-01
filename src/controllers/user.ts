require('dotenv').config();

import { Request, Response } from "express";
import { IPrettyUser, IUser } from "../models/user";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { baseUser } from "../compute/base/user";

export namespace userController {
  export function userLogin(req: Request, res: Response){
    let fetchUser: IUser;
  
    baseUser.getByName(req.body.name)
    .then((user: IUser) => {
      fetchUser = user;
  
      if (!user) {
        res.status(401).json({
          message: "Mauvaise Nom"
        });
        return;
      }
      bcrypt.compare(req.body.password, user.password)
      .then((result: boolean) => {
        if (!result) {
          res.status(401).json({
            message: "Mauvaise Mot de passe"
          });
          return;
        }
  
        const token = jwt.sign(
          {
            email: fetchUser.name,
            userId: fetchUser._id,
            number: fetchUser.number
          },
          process.env.JWT as jwt.Secret,
          { expiresIn: "12h" }
        );
  
        res.status(200).json({
          token: token,
          expiresIn: parseInt(process.env.TOKENLIFETIME as string) * 60 * 60,
          userId: fetchUser._id,
          number: fetchUser.number,
          name: fetchUser.name
        });
      })
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