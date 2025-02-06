/**
 * Agrega una marca de tiempo y un número aleatorio al nombre del archivo antes de la extensión.
 *
 * El formato del nuevo nombre de archivo será:
 * `nombreArchivo_YYYYMMDD_HHMMSS_numeroAleatorio.ext`
 *
 * @param {string} filename - El nombre original del archivo, incluida la extensión si está presente.
 * @returns {string} - El nombre del archivo modificado con la marca de tiempo y el número aleatorio añadido.
 *
 * @example
 * appendTimestampToFile("reporte.pdf"); // Retorna "reporte_20250206_153045_1234.pdf"
 */
export function appendTimestampToFile(filename) {
    // Obtener la fecha y hora actual en formato YYYYMMDD_HHMMSS
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:T]/g, "").split(".")[0]; // "YYYYMMDDHHMMSS"

    // Generar un número aleatorio (0 - 9999)
    const randomNumber = Math.floor(Math.random() * 10000);

    // Encontrar la posición del último punto para determinar la extensión del archivo
    const lastDotIndex = filename.lastIndexOf(".");

    if (lastDotIndex === -1) {
        // Si no se encuentra una extensión, agregar la marca de tiempo y el número aleatorio
        return `${filename}_${timestamp}_${randomNumber}`;
    }

    // Extraer el nombre del archivo y la extensión por separado
    const name = filename.substring(0, lastDotIndex); // Nombre del archivo sin extensión
    const extension = filename.substring(lastDotIndex); // Extensión del archivo (incluido el punto)

    // Construir el nuevo nombre del archivo con la marca de tiempo y el número aleatorio antes de la extensión
    return `${name}_${timestamp}_${randomNumber}${extension}`;
}
