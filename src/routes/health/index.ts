import { Router, Request, Response } from "express";
import { HealthCheck } from "../../controller/health";

const router = Router();

router.get("/", HealthCheck);

export default router;
