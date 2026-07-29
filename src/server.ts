import http from "node:http";

import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./db/connectDB.js";

const PORT = env.PORT;

const startServer = async () => {
    await connectDB();
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});