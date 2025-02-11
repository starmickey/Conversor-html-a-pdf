import { Router } from "express";
import printToPdfController from "./controllers/printToPdf.js";

/**
 * Inicializa las rutas para la API REST.
 *
 * @returns {Router} Un enrutador de Express con las rutas definidas para el estado del servidor y la conversión de HTML a PDF.
 */
export function initRouter() {
  const router = Router();

  /**
   * @route GET /status
   * @description Ruta de prueba para verificar el estado del servidor.
   * 
   * @response {string} Devuelve un mensaje confirmando que el servidor está funcionando.
   * 
   * @example
   * // Solicitud
   * GET /status
   * 
   * // Respuesta
   * "Estoy andando perfecto."
   */
  router.route("/status").get((req, res) => {
    res.send("Estoy andando perfecto.");
  });

  /**
   * @route POST /convert-html-to-pdf
   * @description Convierte un archivo HTML a PDF utilizando los parámetros proporcionados en la solicitud.
   * 
   * @body {string} htmlSrc - Ruta local al archivo HTML de origen.
   * @body {string} outputPath - Ruta donde se guardará el archivo PDF generado.
   * @body {string} [headerQuery] - (Opcional) Selector CSS para extraer el encabezado del HTML.
   * @body {string} [footerQuery] - (Opcional) Selector CSS para extraer el pie de página del HTML.
   * @body {Object} [margin] - (Opcional) Márgenes del PDF (por ejemplo, `{ top: "10mm", bottom: "20mm" }`).
   * @body {string} [cssPath] - (Opcional) Ruta a un archivo CSS externo para aplicar estilos personalizados al PDF.
   * 
   * @throws {Error} Devuelve un código de estado 500 si ocurre un error durante la generación del PDF.
   * @returns {string} Mensaje indicando la ubicación del archivo PDF generado o un mensaje de error.
   * 
   * @example
   * // Solicitud
   * POST /convert-html-to-pdf
   * Content-Type: application/json
   * {
   *   "htmlSrc": "C:/Users/HP/Documents/archivo-ejemplo.html",
   *   "outputPath": "C:/Users/HP/Documents/output.pdf",
   *   "headerQuery": ".header",
   *   "footerQuery": ".footer",
   *   "margin": { "top": "20mm", "bottom": "30mm" },
   *   "cssPath": "styles.css"
   * }
   * 
   * // Respuesta
   * "PDF guardado en C:/Users/HP/Documents/output_20250206_153045.pdf"
   */
  router.route("/convert-html-to-pdf").post(printToPdfController);

  return router;
}
