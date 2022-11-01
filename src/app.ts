import express from 'express';
import bodyParser from "body-parser";
import path from 'path';
import cors from 'cors';

import * as BDD from './BDD';

require('dotenv').config();

BDD.connectToDataBase()
.then(() => {
    console.log("BDD - Connectée");
})
.catch((error: Error) => {
    console.log("BDD - Erreur de connexion");
    console.error(error);
});

//Routes


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join("images")));

//Use routes

module.exports = app;