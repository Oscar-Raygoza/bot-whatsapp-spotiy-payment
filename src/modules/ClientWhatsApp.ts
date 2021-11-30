import fs from "fs";
import qrcode from "qrcode-terminal";

//import ora from "ora";

import { Client, MessageMedia } from "whatsapp-web.js";
import { logWarning, logInfo, logSuccess, logError } from "../../Logs";
export class ClientWhatsApp {
  private client: Client;

  constructor(session: Object) {
    this.client = new Client(session);
  }

  signIn() {
    logInfo("No tenemos session guardada");

    this.client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.client.on("ready", () => {
      logSuccess("Client is ready!");
    });

    this.client.on("auth_failure", () => {
      logError("** Error de autentificacion vuelve a generar el QRCODE **");
    });

    this.client.on("authenticated", (session) => {
      // Guardamos credenciales de de session para usar luego
      fs.writeFile(
        process.env.SESSION_FILE_PATH || "./sesson.json",
        JSON.stringify(session),
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );
    });

    this.client.initialize();
  }

  withSession() {
    // Si exsite cargamos el archivo con las credenciales
    logInfo(`Cargando Validando session con Whatsapp...`);

    this.client.on("ready", () => {
      logSuccess("Client is ready!");
      //connectionReady();
    });

    this.client.on("message", (msg) => {
      msg.reply(
        `Hola ${msg.from}, por el momento no puedo contestar a tu mensaje "${msg.body}" pero una ia intentara contestar en otro momento`
      );
    });

    this.client.on("auth_failure", () => {
      logError(
        "** Error de autentificacion vuelve a generar el QRCODE (Borrar el archivo session.json) **"
      );
    });

    this.client.initialize();
  }
}
