import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import runServer from "./config/database.js";
import FilmRouter from "./Routers/filmRouter.js";

const app = express();
const port = 3000;

dotenv.config();

await runServer();

console.log(mongoose.connection.readyState);

app.listen(port, async () => {
  console.log(`Servidor ativo em http://localhost:${port}`);
});

//MiddleWare
app.use(cors());
app.use(express.json());

//Routers
app.use("/film", FilmRouter);
