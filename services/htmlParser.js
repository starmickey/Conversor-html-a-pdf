import { JSDOM } from "jsdom";
import { logger } from "../config/logger.js";
import { getImageAsBase64 } from "../utils/imgUtils.js";

/**
 * Clase para manejar el análisis y extracción de partes de un documento HTML utilizando JSDOM.
 */
export class DOM {
  /**
   * Instancia de JSDOM que representa el documento HTML analizado.
   * @type {JSDOM}
   */
  dom;

  /**
   * Crea una nueva instancia de la clase DOM.
   *
   * @param {string} html - La cadena de HTML sin procesar que se analizará.
   * @example
   * const dom = new DOM('<div class="header">Hola Mundo</div>');
   */
  constructor(html) {
    this.dom = new JSDOM(html);
    logger.debug(`${html} procesado por JSDOM`);
  }

  /**
   * Extrae y devuelve la primera parte del documento HTML que coincida con el selector especificado.
   * Además, incluye los estilos presentes en el `<head>` del documento para garantizar
   * que la parte extraída conserve su formato original.
   *
   * El elemento extraído es eliminado del documento original.
   *
   * @param {string} query - Un selector CSS válido para buscar elementos en el documento.
   * @returns {string} - Una cadena de HTML que representa la parte extraída, incluyendo estilos, o `undefined` si no se encuentra el elemento.
   *
   * @example
   * const dom = new DOM('<html><head><style>.header { color: red; }</style></head><body><div class="header">Hola</div></body></html>');
   * const header = dom.extractPart(".header");
   * console.log(header); // Retorna: '<div><style>.header { color: red; }</style><div class="header">Hola</div></div>'
   */
  extractPart(query) {
    const document = this.dom.window.document;

    // Extraer los estilos del <head> (style y link de hojas de estilo)
    const headContent = Array.from(
      document.querySelectorAll("style, link[rel='stylesheet']")
    )
      .map((element) => element.outerHTML)
      .join("");

    // Buscar el elemento solicitado
    const part = document.querySelector(query);

    if (!part) {
      logger.debug(`Parte no encontrada para el selector: '${query}'`);
      return;
    }

    // Construir el contenido completo con los estilos y el elemento encontrado
    const content = `<div>${headContent} ${part.outerHTML}</div>`;

    // Eliminar la parte extraída del documento original
    part.remove();

    return content;
  }

  /**
   * Obtiene el contenido completo del documento HTML procesado.
   *
   * @returns {string} - Una cadena que representa todo el documento HTML.
   *
   * @example
   * const dom = new DOM('<html><body><div>Contenido</div></body></html>');
   * console.log(dom.getDocument()); // Retorna el contenido completo del documento HTML
   */
  getDocument() {
    return this.dom.window.document.documentElement.outerHTML;
  }

  /**
   * Convierte todas las imágenes en el documento HTML reemplazando el atributo `src` de cada `<img>`
   * por su equivalente en formato Base64.
   *
   * Este método busca todas las etiquetas `<img>` en el documento y convierte las imágenes cuyo `src`
   * no comienza con `data:` a su representación en Base64. Esto es útil para evitar referencias externas
   * y garantizar que las imágenes estén incrustadas directamente en el documento.
   *
   * @async
   * @returns {Promise<void>} Una promesa que se resuelve cuando todas las imágenes han sido procesadas.
   *
   * @throws {Error} Registra un error en el logger si ocurre un problema al convertir una imagen.
   *
   * @example
   * const dom = new DOM('<html><body><img src="https://example.com/image.jpg"></body></html>');
   * await dom.replaceImgSrcWithBase64();
   * console.log(dom.getDocument());
   * // Retorna el documento HTML con la imagen convertida a Base64
   */
  async replaceImgSrcWithBase64() {
    const document = this.dom.window.document;
    const imgElements = document.querySelectorAll("img");

    for (const img of imgElements) {
      const imgSrc = img.getAttribute("src");

      if (imgSrc && !imgSrc.startsWith("data:")) {
        try {
          // Obtener la imagen en formato Base64
          const base64 = await getImageAsBase64(imgSrc);
          // Reemplazar el atributo src por la versión en Base64
          img.setAttribute("src", base64);
          logger.debug(
            `La imagen ${imgSrc} fue convertida a Base64 en el HTML procesado por JSDOM`
          );
        } catch (error) {
          // Registrar el error si ocurre un problema durante la conversión
          logger.error(
            `Error al convertir la imagen ${imgSrc} a base64: ${error}`
          );
        }
      }
    }
  }
}
