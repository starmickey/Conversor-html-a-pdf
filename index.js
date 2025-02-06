import { logger } from "./config/logger.js";
import { printToPdf } from "./services/printer.js";
import { getConsoleParameters } from "./utils/consoleUtils.js";
import { appendTimestampToFile } from "./utils/stringUtils.js";

/**
 * Punto de entrada principal de la aplicación.
 *
 * Este script lee los parámetros desde un archivo JSON proporcionado por línea de comandos
 * y genera un archivo PDF utilizando la configuración especificada.
 *
 * **Uso esperado en la línea de comandos:**
 * ```sh
 * node index.js parametros.json
 * ```
 *
 * **Estructura esperada del archivo `parametros.json`:**
 * ```json
 * {
 *   "htmlSrc": "https://ejemplo.com/reporte",
 *   "outputPath": "reporte.pdf",
 *   "headerTemplate": "<div>Encabezado</div>",
 *   "footerTemplate": "<div>Pie de página</div>",
 *   "margin": { "top": "10mm", "bottom": "10mm" }
 * }
 * ```
 *
 * @throws {Error} Lanza un error si el archivo de parámetros no existe o es inválido.
 */

logger.info("Servicio iniciado.");

// Obtener los parámetros desde el archivo JSON de entrada
const { htmlSrc, outputPath, headerTemplate, footerTemplate, margin, cssPath } =
  getConsoleParameters();

// Generar un nombre de archivo único para evitar sobreescrituras
const outputFileName = appendTimestampToFile(outputPath);

// Generar el PDF con la configuración obtenida
printToPdf({
  htmlSrc,
  outputPath: outputFileName,
  headerTemplate,
  footerTemplate,
  margin,
  cssPath,
});

logger.info("Proceso finalizado.");
