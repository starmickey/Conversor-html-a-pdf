import winston from "winston";

const { printf } = winston.format;

/**
 * Directory where log files will be stored.
 * @constant {string}
 */
const LOGS_DIR = "logs";

/**
 * Object containing log file paths categorized by log level.
 * @constant {Object}
 */
const LogsPaths = {
  ERROR_PATH: `${LOGS_DIR}/error.log`,    // Logs for error messages
  WARN_PATH: `${LOGS_DIR}/warn.log`,      // Logs for warnings
  INFO_PATH: `${LOGS_DIR}/info.log`,      // Logs for informational messages
  HTTP_PATH: `${LOGS_DIR}/http.log`,      // Logs for HTTP requests
  VERBOSE_PATH: `${LOGS_DIR}/verbose.log`, // Logs for verbose/debugging details
  DEBUG_PATH: `${LOGS_DIR}/debug.log`,    // Logs for debugging messages
};

/**
 * Custom log message format.
 * Each log message will be formatted as:
 * `[LEVEL] [TIMESTAMP]: MESSAGE`
 *
 * @example
 * [INFO] [2025-02-06T14:30:00.123Z]: Server started successfully.
 */
const customFormat = printf(({ level, message }) => {
  return `[${level.toUpperCase()}] [${new Date().toISOString()}]: ${message}`;
});

/**
 * Winston logger configuration.
 *
 * - Logs messages at different levels to both **console** and **log files**.
 * - Uses **colorized output** for console logs.
 * - Stores logs in JSON format for structured analysis.
 * - Each log level has a dedicated file in the `logs/` directory.
 *
 * @constant {winston.Logger}
 */
export const logger = winston.createLogger({
  level: "debug", // Default logging level
  format: winston.format.combine(
    winston.format.colorize({ all: true }), // Apply color formatting
    customFormat // Apply custom log message format
  ),
  transports: [
    /**
     * Console transport:
     * - Logs messages at the "info" level and above to the console.
     * - Uses colors to differentiate log levels.
     */
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ all: true }), // Apply color formatting
        customFormat // Apply custom log message format
      ),
    }),

    /**
     * File transports:
     * - Stores logs in separate files based on log level.
     * - Helps in debugging by categorizing log messages.
     */
    new winston.transports.File({ filename: LogsPaths.ERROR_PATH, level: "error" }),
    new winston.transports.File({ filename: LogsPaths.WARN_PATH, level: "warn" }),
    new winston.transports.File({ filename: LogsPaths.INFO_PATH, level: "info" }),
    new winston.transports.File({ filename: LogsPaths.HTTP_PATH, level: "http" }),
    new winston.transports.File({ filename: LogsPaths.VERBOSE_PATH, level: "verbose" }),
    new winston.transports.File({ filename: LogsPaths.DEBUG_PATH, level: "debug" }),
  ],
});
