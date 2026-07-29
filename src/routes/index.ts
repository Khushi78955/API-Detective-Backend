import { Router } from "express";

import healthRoutes from "./health.routes.js";
import sessionRouter from "./session.routes.js"
import requestRouter from "./request.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/sessions", sessionRouter);
router.use("/sessions/:sessionId/requests", requestRouter);

export default router;