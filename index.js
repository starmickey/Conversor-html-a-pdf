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

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

// Middleware para manejo de errores global
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor." });
});

// Iniciar el servidor
const server = app.listen(PORT, () => {
  logger.info(`Servidor en ejecución en el puerto ${PORT}`);
});

// Manejo de señales para apagar el servidor de forma controlada
process.on("SIGTERM", () => {
  logger.info("Recibida señal SIGTERM. Cerrando servidor...");
  server.close(() => {
    logger.info("Servidor cerrado correctamente.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  logger.info("Recibida señal SIGINT. Cerrando servidor...");
  server.close(() => {
    logger.info("Servidor cerrado correctamente.");
    process.exit(0);
  });
});