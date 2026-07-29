import type { Request, Response } from "express";

import Session from "../models/session.model.js";
import CapturedRequest from "../models/request.model.js";

export const createCapturedRequest = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        const request = await CapturedRequest.create({
            sessionId,
            ...req.body
        })

        session.requestCount += 1;
        await session.save();

        return res.status(201).json({
            success: true,
            data: request
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to save request"
        });
    }
};




export const getCapturedRequests = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }
        const requests = await CapturedRequest
            .find({ sessionId: session._id })
            .sort({ startedAt: -1 });
        return res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch requests"
        });
    }
};