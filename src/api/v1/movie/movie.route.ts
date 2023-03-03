import express from "express";
import {
  addMovie,
  getMovies,
  removeMovie,
  editMovie,
} from "./movie.controller";
import { validate } from "../../../middleware/validator.middleware";
import {
  CreateMovieReqSchema,
  GetMoviesReqSchema,
  UpdateMovieReqSchema,
} from "./movie.schema";

const router = express.Router();

router.post("/add", validate(CreateMovieReqSchema), addMovie);

router.patch("/:id/", validate(UpdateMovieReqSchema), editMovie);

router.get("/list", validate(GetMoviesReqSchema), getMovies);

router.delete("/:id", removeMovie);

export default router;
