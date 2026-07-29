import { Schema, model, type Types } from "mongoose";

export interface IRequest {
    sessionId: Types.ObjectId;
    method: string;
    protocol: string;
    host: string;
    path: string;
    url: string;
    headers: Record<string, string>;
    query: Record<string, unknown>;
    requestBody: unknown;
    responseHeaders: Record<string, string>;
    responseBody: unknown;
    statusCode: number;
    duration: number;
    startedAt: Date;
    completedAt: Date;
}

const requestSchema = new Schema<IRequest>(
    {
        sessionId: {
            type: Schema.Types.ObjectId,
            ref: "Session",
            required: true,
        },
        method: {
            type: String,
            required: true,
            uppercase: true,
            trim: true
        },
        protocol: {
            type: String,
            required: true
        },
        host: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        headers: {
            type: Map,
            of: String,
            default: {}
        },
        query: {
            type: Schema.Types.Mixed,
            default: {}
        },
        requestBody: {
            type: Schema.Types.Mixed,
            default: null
        },
        responseHeaders: {
            type: Map,
            of: String,
            default: {}
        },
        responseBody: {
            type: Schema.Types.Mixed,
            default: null
        },
        statusCode: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true,
            min: 0
        },
        startedAt: {
            type: Date,
            required: true
        },
        completedAt: {
            type: Date,
            required: true
        },
    },
    {
        timestamps: true
    }
)


requestSchema.index({sessionId: 1});
requestSchema.index({method: 1});
requestSchema.index({statusCode: 1});
requestSchema.index({startedAt: -1});


const CapturedRequest = model<IRequest>("CapturedRequest", requestSchema)

export default CapturedRequest;