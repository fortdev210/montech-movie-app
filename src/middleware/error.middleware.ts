import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
import logger from "../services/logger";
import { Response } from "express";

export class BaseException implements Error {
  // Error code
  status: number;
  // User readable error code
  name: string;
  message: string;
  // Detailed error stack
  stack?: string;

  constructor(name: string, status: number, description?: string) {
    this.name = name;
    this.status = status;
    this.stack = description;
  }
}

export enum ErrorCode {
  UKNOWN_ERROR = "UKNOWN_ERROR",
  PRISMA_VALIDATION_ERROR = "PRISMA_VALIDATION_ERROR",
  DATA_NOT_FOUND = "DATA_NOT_FOUND",
  INVALID_REQUEST = "INVALID_REQUEST",
}

/**
 * A generic error handler to catch and report any expected/unexpected error in the app.
 * @param res  Response object to respond api
 * @param err Details of the error thrown
 */
export const handleError = (res: Response, err: Error) => {
  let stack = "";
  let status =
    err instanceof BaseException
      ? (err as BaseException).status
      : StatusCodes.INTERNAL_SERVER_ERROR;
  const error = err.name;
  let description =
    err instanceof BaseException
      ? err.stack
      : "Something went wrong. Please contact support";
  status =
    err instanceof Prisma.PrismaClientKnownRequestError
      ? StatusCodes.BAD_REQUEST
      : status;
  stack =
    err instanceof Prisma.PrismaClientKnownRequestError
      ? ((err as Prisma.PrismaClientKnownRequestError).meta.message as string)
      : stack;
  description =
    err instanceof Prisma.PrismaClientKnownRequestError
      ? "Data not found or incorrect data provided"
      : description;

  status =
    err instanceof Prisma.PrismaClientValidationError
      ? StatusCodes.BAD_REQUEST
      : status;
  stack =
    err instanceof Prisma.PrismaClientValidationError
      ? ((err as Prisma.PrismaClientValidationError).message as string)
      : stack;
  description =
    err instanceof Prisma.PrismaClientValidationError
      ? "Data not found or incorrect data provided"
      : description;
  status =
    err instanceof Prisma.PrismaClientKnownRequestError
      ? StatusCodes.BAD_REQUEST
      : status;
  stack =
    err instanceof Prisma.PrismaClientKnownRequestError
      ? ((err as Prisma.PrismaClientValidationError).message as string)
      : stack;
  description =
    err instanceof Prisma.PrismaClientKnownRequestError
      ? "Data not found or incorrect data provided"
      : description;

  const errRes = {
    error,
    description,
  };
  // log the error in error.log

  logger.error({
    error,
    description,
    stack,
  });
  res.status(status).json(errRes);
};
