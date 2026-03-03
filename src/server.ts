import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

export const createServer = () => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan("dev")) // to log request
    .use(express.urlencoded({ extended: true })) // for parsing request bodies
    .use(express.json())
    .use(cors()); // to allow x-orgin request

  app.get("/health", (req: Request, res: Response) => {
    res.json({ ok: true });
  });

  return app;
};
