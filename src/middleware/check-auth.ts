import { Response } from "express";
import { BackendError, errorTypes } from "../error/backendError";
import { fetchCorrectAPIKey } from "../apiKeyControl";

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
        else {
            throw new BackendError(errorTypes.Auth, "Token not provided");
        }
    } 
    catch (error : any) {
        res.status(401).send(new BackendError(errorTypes.Auth, error).display());
    }
}