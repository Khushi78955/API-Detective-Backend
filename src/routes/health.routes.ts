import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "API Detective Backend is running",
        timestamp: new Date().toISOString(),
    })
})

export default router;