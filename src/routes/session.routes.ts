import { Router } from "express";
import { createSession, getAllSessions, getSessionById, deleteSession } from "../controllers/session.controller.js";

const router = Router();

router.get("/", getAllSessions);
router.post("/", createSession);
router.get("/:id", getSessionById);
router.delete("/:id", deleteSession);

export default router;