import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const addMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "create successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "create successfully",
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
    res.status(StatusCodes.OK).json({
      message: "create successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "create successfully",
    });
  } catch (error) {
    next(error);
  }
};
