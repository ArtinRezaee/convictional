import express from "express";
import cors from "cors";
import asyncHandler from "express-async-handler";
import bodyParser from "body-parser";
import httpErrors from "http-errors";
import helmet from "helmet";
import { storeRoutes, productRoutes } from "./routes";
import { isBodyValid } from "./common";
import { initializeDatasources } from "./dataSources";

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  initializeDatasources();
}

app.use(
  "/",
  asyncHandler(async (req, res, next) => {
    if (!isBodyValid) {
      return next(httpErrors(400, "Invalid request body."));
    }
    next();
  })
);

app.use("/products", productRoutes);
app.use("/store", storeRoutes);

export default app;
