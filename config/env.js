import "dotenv/config";

const validNodeEnvs = ["development", "production", "test"];
const validLogLevels = [
  "error",
  "warn",
  "info",
  "http",
  "verbose",
  "debug",
  "silly",
];

/**
 * Valida una variable de entorno contra un conjunto de valores permitidos.
 *
 * @param {string} value - Valor de la variable de entorno.
 * @param {Array<string>} validValues - Lista de valores válidos.
 * @param {string} variableName - Nombre de la variable de entorno para el mensaje de error.
 * @throws {Error} Lanza un error si el valor no es válido.
 */
function validateEnvVariable(value, validValues, variableName) {
  if (!validValues.includes(value)) {
    throw new Error(
      `Variable de entorno ${variableName} inválida. Debe ser uno de los siguientes valores: ${validValues.join(
        " | "
      )}. Valor actual: "${value}".`
    );
  }
}

/**
 * Directorio donde se almacenarán los archivos de registro (logs).
 * Si no se especifica, se usa "logs" por defecto.
 * @constant {string}
 */
const LOGS_DIR = process.env.LOGS_DIR || "logs";

/**
 * Puerto en el que se ejecutará la aplicación.
 * Si no se especifica, se usa el puerto "3000" por defecto.
 * @constant {string}
 */
const PORT = process.env.PORT || "3000";

/**
 * Entorno de ejecución de la aplicación (development, production, test).
 * Si no se especifica, se usa "development" por defecto.
 * @constant {string}
 */
const NODE_ENV = process.env.NODE_ENV || "development";
validateEnvVariable(NODE_ENV, validNodeEnvs, "NODE_ENV");

/**
 * Nivel de logeo de Winston mostrado en la consola.
 * Véase https://github.com/winstonjs/winston para entender más sobre los niveles de logueo
 * Si no se especifica, se usa "info" por defecto.
 * @constant {string}
 */
const LOG_LEVEL = process.env.LOG_LEVEL || "info";
validateEnvVariable(LOG_LEVEL, validLogLevels, "LOG_LEVEL");

export { LOGS_DIR, PORT, NODE_ENV, LOG_LEVEL };
