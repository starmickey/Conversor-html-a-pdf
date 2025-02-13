import winston from "winston";
import "winston-daily-rotate-file";
import { LOG_LEVEL, LOGS_DIR } from "./env.js";

const { printf } = winston.format;

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

const transport = (level) => {
  return new winston.transports.DailyRotateFile({
    dirname: LOGS_DIR,
    filename: `${level}-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "14d",
    level,
  });
};

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
  level: LOG_LEVEL, // Default logging level
  format:winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    /**
     * Console transport:
     * - Logs messages at the "LOG_LEVEL" level and above to the console.
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
    transport("error"),
    transport("warn"),
    transport("info"),
    transport("http"),
    transport("verbose"),
    transport("debug"),
  ],
});
