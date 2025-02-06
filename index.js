import { logger } from "./config/logger.js";
import { DOM } from "./services/html.js";
import { printToPdf } from "./services/printer.js";
import { getConsoleParameters } from "./utils/consoleUtils.js";
import fs from "fs";
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
const { htmlSrc, outputPath, headerQuery, footerQuery, margin } =
  getConsoleParameters();  
  
// Leer el contenido del archivo HTML
logger.info(`Leyendo el archivo ${htmlSrc}...`);
const htmlContent = fs.readFileSync(htmlSrc, "utf8");

// Crear una instancia del analizador de HTML
const dom = new DOM(htmlContent);

// Obtener las plantillas del encabezado y pie de página si se especifican
const headerTemplate = headerQuery ? dom.getPart(headerQuery) : "";
const footerTemplate = footerQuery ? dom.getPart(footerQuery) : "";

// Generar un nombre de archivo único para evitar sobreescrituras
const outputFileName = appendTimestampToFile(outputPath);

// Generar el PDF con la configuración obtenida
printToPdf({ htmlSrc, outputPath: outputFileName, headerTemplate, footerTemplate, margin });

logger.info("Proceso finalizado.");
