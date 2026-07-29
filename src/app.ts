import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import apiRoutes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());


app.use("/api", apiRoutes);


app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

export default app;


