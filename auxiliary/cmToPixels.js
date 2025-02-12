function cmToPixels(DPI, cm) {
    const pixelsPerCm = DPI / 2.54;  // Conversion factor
    const pixels = cm * pixelsPerCm;
    return Math.round(pixels);  // Round to the nearest whole number
}

// Example usage:
const DPI = 96;
const cm = 5;
const pixels = cmToPixels(DPI, cm);
console.log(`${cm} cm = ${pixels} pixels`);
