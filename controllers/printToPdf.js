import { DOM } from "../services/htmlParser.js";
import { printToPdf } from "../services/printer.js";
import { appendTimestampToFile } from "../utils/stringUtils.js";
import { logger } from "../config/logger.js";
import fetchFile from "../services/fetchFile.js";

/**
 * Controlador para manejar la solicitud POST en `/convert-html-to-pdf`.
 *
 * Este controlador procesa un archivo HTML proporcionado o el contenido HTML directamente,
 * y lo convierte en un archivo PDF. Permite personalizar el encabezado, pie de página,
 * márgenes y aplicar estilos CSS personalizados.
 *
 * @param {Object} req - Objeto de la solicitud HTTP de Express.
 * @param {Object} res - Objeto de la respuesta HTTP de Express.
 *
 * @body {string} [html] - (Opcional) Contenido HTML como cadena. Si no se incluye, htmlSrc es obligatorio.
 * @body {string} [htmlSrc] - (Opcional) Ruta local al archivo HTML que se convertirá en PDF. Si no se incluye, html es obligatorio.
 * @body {string} outputPath - Ruta donde se almacenará el archivo PDF generado.
 * @body {string} [headerQuery] - (Opcional) Selector CSS para extraer el encabezado del HTML.
 * @body {string} [footerQuery] - (Opcional) Selector CSS para extraer el pie de página del HTML.
 * @body {Object} [margin] - (Opcional) Configuración de los márgenes del PDF (por ejemplo, `{ top: "10mm", bottom: "20mm" }`).
 * @body {string} [cssPath] - (Opcional) Ruta al archivo CSS para aplicar estilos personalizados al PDF.
 *
 * @throws {Error} Lanza un error si falta alguno de los parámetros obligatorios o si hay problemas durante la generación del PDF.
 * @returns {void} Responde con la ubicación del PDF generado o un mensaje de error.
 */
export default async function printToPdfController(req, res) {
  try {
    // Obtener los parámetros desde el cuerpo de la solicitud
    const {
      html,
      htmlSrc,
      outputPath,
      headerQuery,
      footerQuery,
      margin,
      cssPath,
    } = req.body;
    
    // Validar parámetros de entrada
    if ((!html && !htmlSrc) || !outputPath) {
      logger.warn(
        `BAD REQUEST: No se proveyó los parámetros obligatorios. Se requiere un html o un htmlSrc, y ademas un outputPath`
      );
      return res
        .status(400)
        .send("Faltan parámetros obligatorios: html o htmlSrc o outputPath.");
    }

    let htmlContent;

    if (html) {
      // Si se proporciona el HTML directamente en la solicitud
      htmlContent = html;
    } else {
      // Si se proporciona la ruta al archivo HTML, leerlo desde el disco
      logger.info(`Obteniendo HTML del directorio ${htmlSrc}`);
      htmlContent = fetchFile(htmlSrc, "utf8");

      // Si no se encontró el HTML, retornar un error 404
      if (!htmlContent) {
        return res.status(404).send(`No se encontró el archivo HTML en ${htmlSrc}`);
      }
      logger.debug(`Lectura de HTML finalizada desde ${htmlSrc}`);
    }

    // Crear una instancia del analizador DOM para extraer partes del documento
    const dom = new DOM(htmlContent);

    // Reemplazar todas las imágenes por su versión en base64 para que puppeteer pueda procesarlas
    await dom.replaceImgSrcWithBase64();

    // Extraer partes del documento HTML para encabezado y pie de página, si se proporciona un query
    const headerTemplate = dom.extractPart(headerQuery);
    const footerTemplate = dom.extractPart(footerQuery);

    if (headerTemplate) logger.debug("Se encontró un encabezado");
    if (footerTemplate) logger.debug("Se encontró un pié de página");

    // Obtener el contenido principal del documento HTML sin las partes extraídas
    const mainContent = dom.getDocument();

    // Generar un nombre de archivo único para evitar sobreescrituras
    const outputFileName = appendTimestampToFile(outputPath);

    // Generar el PDF con la configuración obtenida
    await printToPdf({
      mainContent,
      outputPath: outputFileName,
      headerTemplate,
      footerTemplate,
      margin,
      cssPath,
    });

    // Responder con la ubicación del archivo PDF generado
    res.send(`PDF guardado en ${outputFileName}`);
  } catch (error) {
    // Manejo de errores: devolver un estado 500 con el mensaje de error
    logger.error(`Error al generar el PDF: ${error.message}`);
    res.status(500).send(`Error al generar el PDF: ${error.message}`);
  }
}
