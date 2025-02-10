import { config as dotenvConfig } from "dotenv";
dotenvConfig();
const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV,
};

export default Object.freeze(config);
