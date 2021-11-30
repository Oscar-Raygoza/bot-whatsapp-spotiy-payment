/**
 * @copyright Oscar-Raygoza
 * @author Oscar Eduardo Raygoza <oscar.eduardo.raygoza@gmail.com>
 * @version v0.1.0 ⚡⚡⚡ 
 * @description server.ts
 * @creationDate 21/November/2021
 */

import http from "http";
import fs from "fs";

import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/posts";

import { ClientWhatsApp } from "./modules/ClientWhatsApp"

const router: Express = express();

router.use(morgan("dev"));

/** Env config */
import "./utils/config";

/** Parse the request */
router.use(express.urlencoded({ extended: false }));

/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

/** Routes */
router.use("/api", routes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: number | string = process.env.PORT ?? 3001;


if(fs.existsSync(process.env.SESSION_FILE_PATH || "./session.json")) {
  //import session.json
  const session = JSON.parse(fs.readFileSync(process.env.SESSION_FILE_PATH || "../session.json", "utf8"));
  const Client = new ClientWhatsApp({
    session
  });

  Client.withSession()
} else {
  const Client = new ClientWhatsApp({});
  Client.signIn();
}

httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);


