import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./config/env.js";
import { logger } from "./config/logger.js";
import { initRouter } from "./routes.js";

/**
 * Punto de entrada principal para iniciar el servidor de la API REST.
 * Utiliza Express como framework para manejar las peticiones HTTP.
 */

// Crear una instancia de la aplicación Express
const app = express();

/**
 * Middleware para parsear el cuerpo de las solicitudes HTTP:
 * - `urlencoded`: Para datos enviados desde formularios.
 * - `json`: Para solicitudes con datos en formato JSON.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Middleware para inicializar las rutas de la aplicación.
 * Todas las rutas definidas en `initRouter` estarán accesibles desde `/`.
 */
app.use("/", initRouter());

/**
 * Inicia el servidor en el puerto especificado y registra un mensaje en el logger.
 */
app.listen(PORT, () => {
  logger.info(`Servidor en ejecución en el puerto ${PORT}`);
});
