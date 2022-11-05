require('dotenv').config();

import { Request, Response } from "express";
import { IUser } from "../models/user";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { baseUser } from "../compute/base/user";

export namespace userController {
  export function createUser(req: Request, res: Response){
    if (req.body.invitationCode !== process.env.INVITECODE) {
      res.status(500).json({
        message: "Wrong invitation code"
      });
      return;
    }
  
    bcrypt.hash(req.body.password, 10).then((hash: string) => {
      baseUser.register(req.body.name, hash, req.body.number)
        .then((result: any) => {
          if(result.errors) throw result;
                    
          res.status(201).json({
            status: 'OK'
          });
        })
        .catch((error: any) => {
          res.status(500).json({
            error: error
          });
        });
    });
  };
  
  export function userLogin(req: Request, res: Response){
    let fetchUser: IUser;
  
    baseUser.getByName(req.body.name)
    .then((user: IUser) => {
      fetchUser = user;
  
      if (!user) {
        return res.status(401).json({
          message: "Mauvaise Email"
        });
      }
      bcrypt.compare(req.body.password, user.password)
      .then((result: any) => {
        if (!result) {
          return res.status(401).json({
            message: "Mauvaise Mot de passe"
          });
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
          number: fetchUser.number
        });
      })
    })
    .catch((error: Error) => {
      return res.status(401).json({
        errorMessage: error
      });
    });
  }
}