import express from "express";

import { createFilm, deleteFilm, findFilm, listFilm, updateFilm } from "../Controllers/filmController.js";



const router = express.Router();

//Criar um film
router.post("/", createFilm);

//Listar todos os films
router.get("/list", listFilm);

//Achar um film
router.get("/:title", findFilm);

//Update film
router.put("/:title", updateFilm);

//Delete film
router.delete("/:title", deleteFilm);

export default router;
