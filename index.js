import { printToPdf } from "./services/printer.js";
import { getConsoleParameters } from "./utils/consoleUtils.js";

/**
 * Main entry point of the application.
 * 
 * This script reads command-line parameters from a JSON file, then generates a PDF
 * using the provided parameters.
 * 
 * Expected command-line usage:
 * ```
 * node index.js parameters.json
 * ```
 * 
 * The `parameters.json` file should contain the necessary options for PDF generation.
 * Example:
 * ```json
 * {
 *   "htmlSrc": "https://example.com/report",
 *   "outputPath": "report.pdf",
 *   "headerTemplate": "<div>Header</div>",
 *   "footerTemplate": "<div>Footer</div>",
 *   "margin": { "top": "10mm", "bottom": "10mm" }
 * }
 * ```
 * 
 * @throws {Error} If the parameters file is missing or invalid.
 */

// Retrieve command-line parameters by reading and parsing the provided JSON file
const args = getConsoleParameters();

// Call the function to generate a PDF using the parsed parameters
printToPdf(args);
