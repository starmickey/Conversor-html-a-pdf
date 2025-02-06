/**
 * Appends a random number to the filename before the file extension.
 *
 * @param {string} filename - The original filename, including extension if present.
 * @returns {string} - The modified filename with a random number appended before the extension.
 *
 * @example
 * appendRandomNumberToFile("document.pdf"); // Returns "document_123456789.pdf"
 * appendRandomNumberToFile("image.png");    // Returns "image_987654321.png"
 * appendRandomNumberToFile("backup");       // Returns "backup_345678901"
 * appendRandomNumberToFile("archive.tar.gz"); // Returns "archive.tar_567890123.gz"
 */
export function appendRandomNumberToFile(filename) {
    // Generate a random number (0 - 999999999) to ensure uniqueness
    const randomNumber = Math.floor(Math.random() * 1000000000);

    // Find the position of the last dot to determine the file extension
    const lastDotIndex = filename.lastIndexOf(".");

    if (lastDotIndex === -1) {
        // If no extension is found, append the random number at the end of the filename
        return `${filename}_${randomNumber}`;
    }

    // Extract the filename and extension separately
    const name = filename.substring(0, lastDotIndex); // Filename without extension
    const extension = filename.substring(lastDotIndex); // File extension (including the dot)

    // Construct the new filename with the random number before the extension
    return `${name}_${randomNumber}${extension}`;
}
