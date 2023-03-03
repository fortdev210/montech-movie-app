import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import authRouter from "./api/v1/auth/auth.route";
import userRouter from "./api/v1/user/user.route";
import logger from "./services/logger";
import validateEnv from "./utils/validate-env";

import swaggerDoc from "./swagger.json";
import { errorMiddleware } from "./middleware/error.middleware";

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

// add router here
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/user", userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(errorMiddleware);
export const server = app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
