import dotenv from "dotenv";
import { cleanEnv, port, str } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
    PORT: port({ default: 8000 }),
    MONGO_URI: str(),
    CLIENT_URL: str(),
});

export default env;