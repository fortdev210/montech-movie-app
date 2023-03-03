import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import logger from "../services/logger";

export enum ErrorCode {
  UNAUTHORIZED = "UNAUTHORIZED",
  INVALID_TOKEN = "INVALID_TOKEN",
  UKNOWN_ERROR = "UKNOWN_ERROR",
  EMAIL_ALREADY_EXIST = "EMAIL_ALREADY_EXIST",
  INVALID_CREDENTIAL = "INVALID_CREDENTIAL",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  VERIFICATION_CODE_NOT_FOUND = "VERIFICATION_CODE_NOT_FOUND",
  WRONG_VERIFICATION_CODE = "WRONG_VERIFICATION_CODE",
  PRISMA_VALIDATION_ERROR = "PRISMA_VALIDATION_ERROR",
  MOVIE_NOT_FOUND = "MOVIE_NOT_FOUND",
  INVALID_REQUEST = "INVALID_REQUEST",
}

export class CustomError {
  status: number;
  errCode: ErrorCode;
  description: string;

  constructor(status: number, errCode: ErrorCode, description: string) {
    this.status = status;
    this.errCode = errCode;
    this.description = description;
  }
}

export const errorMiddleware: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || err.statusCode || 500;
  let errCode: ErrorCode;
  let description = "";

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    errCode = ErrorCode.INVALID_REQUEST;
    description = "Invalid paramter or bad request";
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    errCode = ErrorCode.PRISMA_VALIDATION_ERROR;
    description = "Data not found or incorrect data provided ";
  } else {
    errCode = err.errCode || ErrorCode.UKNOWN_ERROR;
    description = err.description || err.message || "Something went wrong!";
  }

  logger.error(`Error:  ${JSON.stringify(err)}`);
  res.status(statusCode).json({ errCode: errCode, description: description });
};
