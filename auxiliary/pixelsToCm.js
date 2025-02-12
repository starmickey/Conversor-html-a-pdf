function pixelsToCm(DPI, pixels) {
    const cmPerPixel = 2.54 / DPI;  // Conversion factor
    const cm = pixels * cmPerPixel;
    return cm.toFixed(2);  // Round to 2 decimal places
}

// Example usage:
const DPI = 96;
const pixels = 200;
const cm = pixelsToCm(DPI, pixels);
console.log(`${pixels} pixels = ${cm} cm`);
