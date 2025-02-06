import { appendRandomNumberToFile } from "../utils/stringUtils.js";
import puppeteer from "puppeteer";

/**
 * Generates a PDF from an HTML source using Puppeteer.
 *
 * @param {Object} options - Configuration options for the PDF generation.
 * @param {string} options.htmlSrc - The URL or local path of the HTML file to convert into a PDF.
 * @param {string} options.outputPath - The desired file path where the generated PDF should be saved.
 * @param {string} [options.headerTemplate] - Optional HTML string for the header template of the PDF.
 * @param {string} [options.footerTemplate] - Optional HTML string for the footer template of the PDF.
 * @param {Object} [options.margin] - Optional margin settings for the PDF.
 * 
 * @throws {Error} Throws an error if `htmlSrc` or `outputPath` is not provided.
 * @returns {Promise<void>} A promise that resolves when the PDF is successfully generated.
 */
export async function printToPdf({
  htmlSrc,
  outputPath,
  headerTemplate,
  footerTemplate,
  margin,
}) {
  // Validate input parameters
  if (!htmlSrc) {
    throw Error("No se incluyó la ruta del HTML (htmlSrc)");
  }

  if (!outputPath) {
    throw Error("No se incluyó la 'outputPath' del PDF");
  }

  // Append a random number to the output file name to avoid overwriting existing files
  const outputFileName = appendRandomNumberToFile(outputPath);

  // Generate the PDF
  return await (async () => {
    try {
      // Launch a new Puppeteer browser instance
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Navigate to the provided HTML source
      await page.goto(htmlSrc, { waitUntil: "networkidle0" });

      // Set media type to 'screen' so it renders like a normal web page (not print styles)
      await page.emulateMediaType("screen");

      // Generate the PDF with the specified settings
      await page.pdf({
        path: outputFileName,  // Save the PDF with the modified filename
        format: "A4",  // Standard A4 format
        displayHeaderFooter: headerTemplate || footerTemplate ? true : false,  // Enable headers/footers if provided
        margin,  // Apply margin settings
        footerTemplate,  // Footer HTML template
        headerTemplate,  // Header HTML template
      });

      console.log("Conversion complete. PDF file generated successfully.");

      // Close the browser instance
      await browser.close();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  })();
}
