# Conversor de HTML a PDF

## 📖 Descripción

Este proyecto es una **API REST** que permite convertir un archivo **HTML** en un **PDF** utilizando **Express** y **Puppeteer**.

Admite la configuración de **encabezado**, **pie de página**, **márgenes** y **estilos personalizados** para generar PDF a medida.

---

## 🚀 Cómo usar

### Requisitos previos

1. **Node.js** instalado en tu máquina.

2. Instala las dependencias del proyecto:

```bash
npm install
```

3. Configura el entorno (`.env`)

Puedes definir las siguientes variables en el archivo .env para personalizar la configuración del servidor:

```ini
PORT=3000
LOGS_DIR=logs
```


### Iniciar el servidor

Para ejecutar el servidor de la API:

```bash
npm start
```

Por defecto, el servidor se ejecuta en el puerto definido en el archivo .env o en el puerto 3000.

---

## 📌 Endpoints de la API

### 1. Verificar el estado del servidor

`GET /status`

**Descripción**: Verifica si el servidor está funcionando correctamente.

#### Ejemplo de uso:

```bash
curl http://localhost:3000/status
```
##### Respuesta:

```plaintext
Estoy andando perfecto.
```

### 2. Convertir HTML a PDF

`POST /convert-html-to-pdf`

**Descripción**: Convierte un archivo HTML en PDF utilizando los parámetros enviados en el cuerpo de la solicitud.

#### Ejemplo de solicitud:

```json
{
    "htmlSrc": "C:/Users/HP/Documents/programas-utilidades/html-to-pdf/ejemplo/archivo-ejemplo.htm",
    "outputPath": "C:/Users/HP/Documents/programas-utilidades/html-to-pdf/ejemplo/output.pdf",
    "headerTemplate": "<div>Encabezado personalizado</div>",
    "footerTemplate": "<div style='text-align:center;'>Página <span class='pageNumber'></span> de <span class='totalPages'></span></div>",
    "margin": {
        "top": "20mm",
        "bottom": "30mm"
    },
    "cssPath": "styles.css"
}
```

#### 📌 Parámetros del cuerpo de la solicitud 


| Parámetro  | Tipo  | Descripción  |
|------------|--------------|--------------|
| `htmlSrc` | `string` | Ubicación del html a transformar a pdf |
| `outputPath` | `string` | Ubicación donde se almacenará el pdf creado |
| `headerQuery` | `string` | (Opcional) Query que marca la ubicacion del encabezado. Por ejemplo, si el encabezado es `<div class="cabecera"></div>`, query = `.cabecera`. |
| `footerQuery` | `string` | (Opcional) Query que marca la ubicacion del pie de página. Véase headerQuery. |
| `margin` | `object` | (Opcional) Tamaño del encabezado y pie de página. Este argumento es obligatorio para que estos sean visibles. |
| `cssPath` | `string` | (Opcional) Ubicación del archivo de estilos a aplicar al cuerpo del PDF. |

#### ✨ Customización de pie de página

Veáse la [Puppeteer API](https://pptr.dev/next/api/puppeteer.pdfoptions#headertemplate) para añadir clases al HTML original que permitan mejorar los pie de páginas.

#### 🛠️ Ejemplo Completo

**Solicitud POST:**

```bash
curl -X POST http://localhost:3000/convert-html-to-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "htmlSrc": "C:/Users/HP/Documents/programas-utilidades/html-to-pdf/ejemplo/archivo-ejemplo.htm",
    "outputPath": "C:/Users/HP/Documents/programas-utilidades/html-to-pdf/ejemplo/output.pdf",
    "headerTemplate": "<div>Encabezado personalizado</div>",
    "footerTemplate": "<div style=\"text-align:center;\">Página <span class=\"pageNumber\"></span> de <span class=\"totalPages\"></span></div>",
    "margin": { "top": "20mm", "bottom": "30mm" },
    "cssPath": "styles.css"
  }'
```

## 📂 Estructura del Proyecto

```bash
/config       -> Configuración del entorno y logger
/services     -> Lógica principal para la conversión de HTML a PDF
/utils        -> Utilidades adicionales (gestión de archivos, strings, etc.)
```
