import fs from "fs/promises";
import path from "path";

/**
 * Convierte una imagen en el sistema de archivos a una cadena base64.
 *
 * @param {string} filePath - Ruta física del archivo de imagen.
 * @returns {Promise<string>} La representación base64 de la imagen.
 */
export async function getImageAsBase64(filePath) {
  try {
    // Verifica si el archivo existe
    const absolutePath = path.resolve(filePath);
    await fs.access(absolutePath);

    // Lee el archivo como un buffer
    const fileBuffer = await fs.readFile(absolutePath);

    // Detecta el tipo MIME a partir de la extensión del archivo
    const mimeType = getMimeType(absolutePath);

    // Convierte el buffer a una cadena base64
    return `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
  } catch (error) {
    console.error(`Error al convertir la imagen a base64: ${error.message}`);
    throw error;
  }
}

/**
 * Obtiene el tipo MIME basado en la extensión del archivo.
 *
 * @param {string} filePath - Ruta del archivo.
 * @returns {string} Tipo MIME correspondiente.
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".bmp":
      return "image/bmp";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream"; // Tipo MIME por defecto
  }
}
