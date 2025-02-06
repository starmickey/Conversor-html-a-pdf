import 'dotenv/config';

/**
 * Directory where log files will be stored.
 * @constant {string}
 */
const LOGS_DIR = process.env.LOGS_DIR || "logs";

export {
    LOGS_DIR
};
