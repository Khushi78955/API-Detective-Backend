import { Schema, model } from "mongoose";

export interface ISession {
    name: string;
    description?: string;
    status: "recording" | "completed";
    requestCount: number;
}

const sessionSchema = new Schema<ISession>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        status: {
            type: String,
            enum: ["recording", "completed"],
            default: "recording"
        },

        requestCount: {
            type: Number,
            default: 0,
            min: 0
        },
    },
    {
        timestamps: true,
    }
)

const Session = model<ISession>("Session", sessionSchema)

export default Session;