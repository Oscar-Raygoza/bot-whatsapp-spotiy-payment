import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

let pathUrl: string;

switch (process.env.NODE_ENV) {
  case "test":
    pathUrl = path.resolve(__dirname, "../../.env.test");
    break;
  case "production":
    pathUrl = path.resolve(__dirname, "../../.env.production");
    break;
  default:
    pathUrl = path.resolve(__dirname, "../../.env.development");
}
dotenv.config({ path: pathUrl });

export const APP_ID = process.env.APP_ID;
export const LOG_LEVEL = process.env.LOG_LEVEL;
