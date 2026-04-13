import { Router } from "express";
import healthRoutes from "./health/index";

const router = Router();

router.use("/health", healthRoutes);

// Add a catch-all for unknown routes in this group
router.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default router;
