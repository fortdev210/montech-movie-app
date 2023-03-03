import { Genre } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createMovie,
  retrieveMovies,
  deleteMovie,
  updateMovie,
} from "./movie.service";

export const addMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const result = await createMovie(payload);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const editMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = await updateMovie(id, payload);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.query.page as unknown as number;
    const genre = req.query.genre as string;
    const release_year = req.query.release_year as unknown as number;
    const rating = req.query.rating as unknown as number;

    const result = await retrieveMovies(
      page,
      genre as Genre,
      release_year,
      rating
    );

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const removeMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await deleteMovie(id);

    res.status(StatusCodes.OK).json({
      message: "Removed movie",
    });
  } catch (error) {
    next(error);
  }
};