import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config();
dotenvExpand(myEnv);

const config = {
    db: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS
    }
};

export default config;
