# Conversor de HTML a PDF

## Cómo usar

Para correr el proyecto ejecutar:

```bash
    node index.js args.json
```

Donde `args.json` es un archivo que contiene todos los parámetros requeridos por el `index.js`. A continuación, se presenta un ejemplo:

```json
{
    "htmlSrc": "C:/Users/HP/Documents/programas-utilidades/html-to-pdf/ejemplo/archivo-ejemplo.htm",
    "outputPath": "C:/Users/HP/Documents/programas-utilidades/html-to-pdf/ejemplo/output.pdf",
    "headerTemplate": "<div></div>",
    "footerTemplate": "<div style=\"font-size:10px; width:100%; text-align:center; padding:5px 0;\">FOOTER - Page <span class='pageNumber'></span> of <span class='totalPages'></span></div>",
    "margin": {
        "top": "20mm",
        "bottom": "30mm"
    }
}
```

Donde:
* `htmlSrc`: Ubicación del html a transformar a pdf
* `outputPath`: Ubicación donde se almacenará el pdf creado
* `headerTemplate`: html del encabezado. A este se le puede añadir el pie de página, el número total de página y otros parámetros. Veáse la [Puppeteer API](https://pptr.dev/next/api/puppeteer.pdfoptions#headertemplate).
* `footerTemplate`: html del pie de página. Se lo configura de forma similar a `headerTemplate`.
* `margin`: tamaño del encabezado y pie de página. Este argumento es obligatorio para que estos sean visibles.