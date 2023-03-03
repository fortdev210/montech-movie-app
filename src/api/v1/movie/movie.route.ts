import express from "express";
import { addMovie } from "./movie.controller";
const router = express.Router();

router.post("/", addMovie);

export default router;
