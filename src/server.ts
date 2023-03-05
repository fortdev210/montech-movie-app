import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import movieRouter from "./api/v1/movie/movie.route";
import { BaseException, handleError } from "./middleware/error.middleware";
import logger from "./services/logger";
import swaggerDoc from "./swagger.json";
import validateEnv from "./utils/validate-env";

const app: Express = express();
const port = process.env.PORT || 3001;

dotenv.config();
validateEnv();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined")); //todo remove in prod?

// api end point health check
app.get("/api/v1/healthcheck", async (req: Request, res: Response) => {
  // const message = await redisClient.get("try");
  res.status(200).json({
    status: "success",
  });
});

app.use("/api/v1/movies", movieRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((req: Request, res: Response) => {
  handleError(res, new BaseException("Bad request", StatusCodes.BAD_REQUEST));
});

process.on("uncaughtException", (err) => {
  logger.error({
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

export const server = app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
