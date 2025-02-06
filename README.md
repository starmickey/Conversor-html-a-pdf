# Conversor de HTML a PDF

## Descripción

Este proyecto permite convertir un archivo **HTML** en un **PDF** utilizando **Puppeteer**.  
Admite la configuración de **encabezado**, **pie de página** y **márgenes** para personalizar el PDF generado.

---

## 🚀 Cómo usar

Para ejecutar el proyecto, usa el siguiente comando:

```bash
node index.js parametros.json
```

Donde `parametros.json` es un archivo JSON que contiene todos los parámetros requeridos.
A continuación, se presenta un ejemplo:

```json
{
    "htmlSrc": "C:/Users/HP/Documents/programas-utilidades/html-to-pdf/ejemplo/archivo-ejemplo.htm",
    "outputPath": "C:/Users/HP/Documents/programas-utilidades/html-to-pdf/ejemplo/output.pdf",
    "headerQuery": ".cabecera_imprimir",
    "footerQuery": ".pie_imprimir",
    "margin": {
        "top": "20mm",
        "bottom": "30mm"
    }
}
```

## 📌 Parámetros del archivo parametros.json

| Parámetro  | Descripción  |
|------------|--------------|
| `htmlSrc` | Ubicación del html a transformar a pdf |
| `outputPath` | Ubicación donde se almacenará el pdf creado |
| `headerQuery` | Query que marca la ubicacion del encabezado. Por ejemplo, si el encabezado es `<div class="cabecera"></div>`, query = `.cabecera`. |
| `footerQuery` | Query que marca la ubicacion del pie de página. Véase headerQuery. |
| `margin` | tamaño del encabezado y pie de página. Este argumento es obligatorio para que estos sean visibles. |

## Customización de pie de página

Veáse la [Puppeteer API](https://pptr.dev/next/api/puppeteer.pdfoptions#headertemplate) para añadir clases al HTML original que permitan mejorar los pie de páginas