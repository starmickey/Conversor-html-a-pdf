import { JSDOM } from "jsdom";

/**
 * Clase para manejar el análisis y consulta de HTML utilizando JSDOM.
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
     *
     * @example
     * const dom = new DOM('<div class="header">Hola Mundo</div>');
     */
    constructor(html) {
        this.dom = new JSDOM(html);
    }

    /**
     * Obtiene el primer elemento HTML que coincida con el selector especificado.
     *
     * @param {string} query - Un selector CSS válido para buscar elementos.
     * @returns {string} - El HTML externo del elemento encontrado, o una cadena vacía si no se encuentra.
     *
     * @example
     * const dom = new DOM('<div class="header">Hola</div>');
     * console.log(dom.getPart(".header")); // Retorna: '<div class="header">Hola</div>'
     */
    getPart(query) {
        return this.dom.window.document.querySelector(query)?.outerHTML || "";
    }
}
