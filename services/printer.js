import puppeteer from "puppeteer";
import { logger } from "../config/logger.js";

/**
 * Genera un archivo PDF a partir de una fuente HTML utilizando Puppeteer.
 * 
 * Este método automatiza la conversión de una página HTML a un archivo PDF,
 * permitiendo personalizar el encabezado, pie de página, márgenesy apicar un archivo de estilos CSS externo.
 *
 * @param {Object} options - Configuración para la generación del PDF.
 * @param {string} options.mainContent - HTML preprocesado que se utilizará como cuerpo del PDF.
 * @param {string} options.outputPath - Ruta del archivo donde se guardará el PDF generado.
 * @param {string} [options.headerTemplate] - (Opcional) HTML para la plantilla del encabezado del PDF.
 * @param {string} [options.footerTemplate] - (Opcional) HTML para la plantilla del pie de página del PDF.
 * @param {Object} [options.margin] - (Opcional) Configuración de los márgenes del PDF.
 * @param {Object} [options.cssPath] - (Opcional) Estilos del cuerpo del PDF.
 * 
 * @returns {Promise<void>} Una promesa que se resuelve cuando el PDF se ha generado exitosamente.
 *
 * @example
 * // Generar un PDF desde una URL
 * await printToPdf({
 *   mainContent: "<html><body><h1>Reporte</h1></body></html>",
 *   outputPath: "reporte.pdf",
 *   headerTemplate: "<div>Encabezado</div>",
 *   footerTemplate: "<div>Pie de página</div>",
 *   margin: { top: "10mm", bottom: "10mm" }
 * });
 */
export async function printToPdf({
  mainContent,
  outputPath,
  headerTemplate,
  footerTemplate,
  margin,
  cssPath,
}) {
  try {
    logger.info("Iniciando la generación del PDF...");
    logger.info(`Ruta de salida del PDF: ${outputPath}`);

    // Iniciar Puppeteer y abrir una nueva página
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    logger.info("Navegador Puppeteer iniciado con éxito.");

    // Si se incluye un archivo CSS, aplicarlo al contenido del PDF
    if (cssPath) {
      await page.addStyleTag({ path: cssPath });
      logger.debug(`Archivo de estilos aplicado desde: ${cssPath}`);
    }
    
    // Establecer el contenido HTML procesado directamente en la página
    await page.setContent(mainContent, { waitUntil: "networkidle0" });
    logger.debug("Contenido HTML cargado correctamente en la página.");

    // Configurar el tipo de medio a 'screen' para evitar aplicar estilos de impresión
    await page.emulateMediaType("screen");

    // Generar el PDF con las opciones proporcionadas
    await page.pdf({
      path: outputPath,  // Guardar el PDF con el nombre especificado
      format: "A4",  // Formato estándar A4
      displayHeaderFooter: !!(headerTemplate || footerTemplate),  // Mostrar encabezado y pie de página si están definidos
      margin,  // Aplicar configuración de márgenes
      footerTemplate,  // Plantilla del pie de página
      headerTemplate,  // Plantilla del encabezado
    });

    logger.info(`PDF generado exitosamente en ${outputPath}`);

    // Cerrar el navegador
    await browser.close();
    logger.info("Navegador Puppeteer cerrado correctamente.");
    
  } catch (error) {
    logger.error(`Error al generar el PDF: ${error.message}`);
    throw error; // Relanzar el error para que pueda ser manejado externamente
  }
}
