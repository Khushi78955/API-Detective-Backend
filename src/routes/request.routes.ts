import { Router } from "express";

import { createCapturedRequest, getCapturedRequests } from "../controllers/request.controller.js";

const router = Router({ mergeParams: true });

router.get("/", getCapturedRequests);
router.post("/", createCapturedRequest);

export default router;