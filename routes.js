import { Router } from "express";
import { printToPdf } from "./services/printer.js";
import { appendTimestampToFile } from "./utils/stringUtils.js";

/**
 * Inicializa las rutas para la API REST.
 *
 * @returns {Router} Un enrutador de Express con las rutas definidas.
 */
export function initRouter() {
  const router = Router();

  /**
   * @route GET /status
   * @description Ruta de prueba para verificar el estado del servidor.
   * @returns {string} Devuelve un mensaje confirmando que el servidor está funcionando.
   */
  router.route("/status").get((req, res) => {
    res.send("Estoy andando perfecto.");
  });

  /**
   * @route POST /convert-html-to-pdf
   * @description Convierte un archivo HTML a PDF utilizando los parámetros proporcionados en la solicitud.
   * 
   * @body {string} htmlSrc - Ruta del archivo HTML de origen.
   * @body {string} outputPath - Ruta donde se guardará el archivo PDF generado.
   * @body {string} [headerTemplate] - (Opcional) Plantilla HTML para el encabezado del PDF.
   * @body {string} [footerTemplate] - (Opcional) Plantilla HTML para el pie de página del PDF.
   * @body {Object} [margin] - (Opcional) Márgenes del PDF (por ejemplo, { top: "10mm", bottom: "20mm" }).
   * @body {string} [cssPath] - (Opcional) Ruta a un archivo CSS externo para estilos personalizados.
   * 
   * @returns {string} Devuelve un mensaje indicando la ubicación del archivo PDF generado.
   */
  router.route("/convert-html-to-pdf").post(async (req, res) => {
    try {
      // Obtener los parámetros desde el cuerpo de la solicitud
      const {
        htmlSrc,
        outputPath,
        headerTemplate,
        footerTemplate,
        margin,
        cssPath,
      } = req.body;

      if (!htmlSrc || !outputPath) {
        return res.status(400).send("Faltan parámetros obligatorios: htmlSrc o outputPath.");
      }

      // Generar un nombre de archivo único para evitar sobreescrituras
      const outputFileName = appendTimestampToFile(outputPath);

      // Generar el PDF con la configuración obtenida
      await printToPdf({
        htmlSrc,
        outputPath: outputFileName,
        headerTemplate,
        footerTemplate,
        margin,
        cssPath,
      });

      res.send(`PDF guardado en ${outputFileName}`);
    } catch (error) {
      res.status(500).send(`Error al generar el PDF: ${error.message}`);
    }
  });

  return router;
}
