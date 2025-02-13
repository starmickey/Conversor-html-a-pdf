import fs from "fs";
import { logger } from "../config/logger.js";

/**
 * Lee el contenido de un archivo desde la ruta especificada.
 * 
 * Esta función utiliza `fs.readFileSync` para leer el contenido del archivo de forma síncrona.
 * Si ocurre un error durante la lectura, se registra el error en el logger y la función retorna `null`.
 * 
 * @param {string} src - Ruta completa del archivo a leer.
 * @param {string} encoding - Codificación utilizada para leer el archivo (por ejemplo, "utf8").
 * 
 * @returns {string|null} El contenido del archivo si la lectura es exitosa, o `null` si ocurre un error.
 * 
 * @example
 * // Leer un archivo en formato UTF-8
 * const content = fetchFile("C:/Users/HP/Documents/archivo-ejemplo.txt", "utf8");
 * console.log(content); // Muestra el contenido del archivo
 */
export default function fetchFile(src, encoding) {
  try {
    // Leer el contenido del archivo con la codificación especificada
    const content = fs.readFileSync(src, encoding);
    return content;
  } catch (error) {
    // Registrar el error en el logger y retornar null
    logger.error(`Se produjo un error al leer el archivo ${src}: ${error}`);
    return null;
  }
}
