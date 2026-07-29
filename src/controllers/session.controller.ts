import type { Request, Response } from "express";
import Session from "../models/session.model.js";
import CapturedRequest from "../models/request.model.js";


export const createSession = async (req: Request, res: Response) => {
    try {
        const session = await Session.create({
            name: req.body.name,
            description: req.body.description
        });

        res.status(201).json({
            success: true,
            data: session
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create session"
        })
    }
}


export const getAllSessions = async (req: Request, res: Response) => {
    try {
        const sessions = await Session.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: sessions
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch sessions"
        })
    }
}


export const getSessionById = async (req: Request, res: Response) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: session
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch session"
        })
    }
}



export const deleteSession = async (req: Request, res: Response) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }
        await CapturedRequest.deleteMany({sessionId: session._id})
        await session.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Session deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete session"
        })
    }
};