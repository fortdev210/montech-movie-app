import express from "express";
import {
  addMovie,
  getMovies,
  removeMovie,
  editMovie,
} from "./movie.controller";
import { validate } from "../../../middleware/validator.middleware";
import { CreateMovieReqSchema } from "./movie.schema";

const router = express.Router();

router.post("/add", validate(CreateMovieReqSchema), addMovie);

router.patch("/:id", editMovie);

router.get("/list", getMovies);

router.delete("/:id", removeMovie);

export default router;
