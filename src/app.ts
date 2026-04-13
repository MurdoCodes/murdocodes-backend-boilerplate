import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import routes from "./routes";

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const API_PREFIX = process.env.API_PREFIX || "/api/v1";
const app: Application = express();
const httpServer = http.createServer(app);

/**
 * Middleware
 */
// parse application/json
app.use(express.json({ limit: "50mb" }));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));

/**
 * Import all routes
 */
app.use(API_PREFIX, routes);

/**
 * Global Error Handler (must have 4 parameters)
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

/**
 * Port Listen to 5000
 */
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
