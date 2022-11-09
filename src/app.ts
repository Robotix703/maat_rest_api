import express from 'express';
import bodyParser from "body-parser";
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
import { userRoutes } from "./routes/user";
import { listRoutes } from "./routes/list";
import { purchaseRoutes } from './routes/purchase';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Use routes
app.use("/api/user", userRoutes);
app.use("/api/list", listRoutes);
app.use("/api/purchase", purchaseRoutes);

module.exports = app;