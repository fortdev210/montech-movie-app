import { PrismaClient, Genre } from "@prisma/client";
import { TNewMovie, TUpdateMovie } from "./movie.schema";
import { CustomError, ErrorCode } from "../../../middleware/error.middleware";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

/**
 * Create a new movie in the database.
 * @param payload
 */
export const createMovie = async (payload: TNewMovie) => {
  const movie = await prisma.movie.create({
    data: {
      ...payload,
    },
  });
  return movie;
};

/**
 * Retrieve movies by pagination and genre
 * @param page
 */
export const retrieveMovies = async (
  page?: number,
  genre?: Genre,
  release_year?: number,
  rating?: number
) => {
  const PAGE_SIZE = 5;
  const skip = (Number(page) - 1) * Number(PAGE_SIZE);

  const movies = await prisma.movie.findMany({
    skip: page ? skip : 0,
    take: page ? Number(PAGE_SIZE) : undefined,
    where: {
      genre: genre ? genre : undefined,
      rating: rating ? rating : undefined,
      release_year: release_year ? release_year : undefined,
    },
  });

  const count = await prisma.movie.count();

  return {
    data: movies,
    meta: {
      total: count,
      page: Number(page),
      size: Number(PAGE_SIZE),
      pages: Math.ceil(count / Number(PAGE_SIZE)),
    },
  };
};

/**
 * Update a movie in the database
 * @param id
 * @param payload
 */
export const updateMovie = async (id: string, payload: TUpdateMovie) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: id,
    },
  });

  if (!movie) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      ErrorCode.MOVIE_NOT_FOUND,
      "Movie with that id does not exist"
    );
  }

  const updatedMovie = await prisma.movie.update({
    where: {
      id: id,
    },
    data: {
      ...payload,
    },
  });

  return updatedMovie;
};

/**
 * Delete movie from the database. TODO: soft delete or permanent delete?
 * @param id
 */
export const deleteMovie = async (id: string) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: id,
    },
  });

  if (!movie) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      ErrorCode.MOVIE_NOT_FOUND,
      "Movie with that id does not exist"
    );
  }

  await prisma.movie.delete({
    where: {
      id,
    },
  });
};
