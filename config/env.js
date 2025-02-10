import 'dotenv/config';

/**
 * Directorio donde se almacenarán los archivos de registro (logs).
 * Si no se especifica en las variables de entorno, se usará el directorio "logs" por defecto.
 * @constant {string}
 */
export const LOGS_DIR = process.env.LOGS_DIR || "logs";

/**
 * Puerto en el que se ejecutará la aplicación.
 * Si no se especifica en las variables de entorno, se usará el puerto "3000" por defecto.
 * @constant {string}
 */
export const PORT = process.env.PORT || "3000";
