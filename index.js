const fs = require("fs");
const puppeteer = require("puppeteer");

// GET PARAMETERS FROM CONSOLE

const argsPath = process.argv.slice(2)[0];

console.log(`\n Procesando el archivo: ${argsPath}\n`);

const args = fs.readFileSync(argsPath);

const { htmlSrc, outputPath, headerTemplate, footerTemplate, margin } =
  JSON.parse(args);

// Validaciones

if (!htmlSrc) {
  throw Error("No se incluyo la ruta del HTML (htmlSrc)");
}

if (!outputPath) {
  throw Error("No se incluyo la 'outputPath' del PDF");
}

// PRINT PDF

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(htmlSrc, { waitUntil: "networkidle0" });

    // To use normal CSS instead of only print styles
    await page.emulateMediaType("screen");

    await page.pdf({
      path: outputPath,
      format: "A4",
      displayHeaderFooter: headerTemplate || footerTemplate ? true : false,
      margin,
      footerTemplate,
      headerTemplate,
    });

    console.log("Conversion complete. PDF file generated successfully.");

    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
