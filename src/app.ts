import express from "express";
import { errorHandler } from "./utils/error-handler";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use(errorHandler);
  return app;
};
