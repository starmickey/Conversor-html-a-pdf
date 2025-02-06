import { logger } from "../config/logger.js";
import { appendRandomNumberToFile } from "../utils/stringUtils.js";
import puppeteer from "puppeteer";

/**
 * Genera un archivo PDF a partir de una fuente HTML utilizando Puppeteer.
 *
 * @param {Object} options - Configuración para la generación del PDF.
 * @param {string} options.htmlSrc - URL o ruta local del archivo HTML a convertir en PDF.
 * @param {string} options.outputPath - Ruta del archivo donde se guardará el PDF generado.
 * @param {string} [options.headerTemplate] - (Opcional) HTML para la plantilla del encabezado del PDF.
 * @param {string} [options.footerTemplate] - (Opcional) HTML para la plantilla del pie de página del PDF.
 * @param {Object} [options.margin] - (Opcional) Configuración de los márgenes del PDF.
 * 
 * @throws {Error} Lanza un error si `htmlSrc` o `outputPath` no son proporcionados.
 * @returns {Promise<void>} Promesa que se resuelve cuando el PDF se genera con éxito.
 */
export async function printToPdf({
  htmlSrc,
  outputPath,
  headerTemplate,
  footerTemplate,
  margin,
}) {
  try {
    // Validar parámetros de entrada
    if (!htmlSrc) {
      throw new Error("No se incluyó la ruta del HTML (htmlSrc)");
    }

    if (!outputPath) {
      throw new Error("No se incluyó la 'outputPath' del PDF");
    }

    logger.info("Iniciando la generación del PDF...");
    logger.info(`Fuente HTML: ${htmlSrc}`);
    logger.info(`Ruta de salida del PDF: ${outputPath}`);

    // Generar un nombre de archivo único para evitar sobreescrituras
    const outputFileName = appendRandomNumberToFile(outputPath);
    logger.info(`El nombre del archivo de salida generado es: ${outputFileName}`);

    // Lanzar Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    logger.info("Navegador Puppeteer iniciado con éxito.");

    // Cargar la página HTML
    await page.goto(htmlSrc, { waitUntil: "networkidle0" });
    logger.info("Página HTML cargada correctamente.");

    // Configurar el tipo de medio a 'screen' para evitar estilos de impresión
    await page.emulateMediaType("screen");

    // Generar el PDF con las configuraciones dadas
    await page.pdf({
      path: outputFileName,  // Guardar el PDF con el nombre generado
      format: "A4",  // Formato estándar A4
      displayHeaderFooter: !!(headerTemplate || footerTemplate),  // Mostrar encabezado/pie si se proporcionan
      margin,  // Aplicar configuración de márgenes
      footerTemplate,  // Plantilla del pie de página
      headerTemplate,  // Plantilla del encabezado
    });

    logger.info("PDF generado exitosamente.");
    
    // Cerrar el navegador
    await browser.close();
    logger.info("Navegador Puppeteer cerrado correctamente.");
    
  } catch (error) {
    logger.error(`Error al generar el PDF: ${error.message}`);
  }
}
