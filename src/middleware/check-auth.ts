import { Response } from "express";
import { BackendError, errorTypes } from "../error/backendError";
import Jwt from "jsonwebtoken";
import { fetchCorrectAPIKey } from "../initialization";

let api_keys : string[];
fetchCorrectAPIKey()
.then((keys : string[]) => {
    api_keys = keys;
});

export default function (req: any, res: Response, next: any) {
    try{
        const api_key_header = req.header("x-api-key");
        if(api_key_header){
            //API-KEY
            if(api_keys.find(e => e == api_key_header)){
                next();
                return;
            } else {
                throw new BackendError(errorTypes.Auth, "Wrong API Key");
            }
        }
        else if(!req.headers.authorization){
            throw new BackendError(errorTypes.Auth, "Token not provided");
        }

        //Token
        const token : string = req.headers.authorization.split(" ")[1];
        const decodedToken : Jwt.JwtPayload =  Jwt.verify(token, process.env.JWT as Jwt.Secret) as Jwt.JwtPayload;
    
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };

        next();
    } 
    catch (error : any) {
        if("expiredAt" in error){
            res.status(401).send(new BackendError(errorTypes.Auth, error.message + "ExpireAt : " + error.expiredAt).display());
        }
        else if("display" in error){
            res.status(401).send(error.display());
        }
        else{
            res.status(401).send(new BackendError(errorTypes.Auth, error).display());
        }
    }
}