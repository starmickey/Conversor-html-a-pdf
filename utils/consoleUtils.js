import fs from "fs";

/**
 * Reads a JSON file containing console parameters and parses it into an object.
 *
 * @returns {Object} - The parsed JSON object containing the console parameters.
 * @throws {Error} - Throws an error if the file cannot be read or is not valid JSON.
 *
 * @example
 * // Command-line execution:
 * // node script.js params.json
 *
 * // params.json:
 * // {
 * //   "key": "value",
 * //   "flag": true
 * // }
 *
 * const params = getConsoleParameters();
 * console.log(params.key); // Output: "value"
 */
export function getConsoleParameters() {
    // Get the first argument passed to the script (expected to be a file path)
    const argsPath = process.argv.slice(2)[0];

    // Read the file synchronously
    const args = fs.readFileSync(argsPath);

    // Parse the file content as JSON and return the result
    return JSON.parse(args);
}
