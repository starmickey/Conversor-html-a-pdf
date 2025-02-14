# Conversor de HTML a PDF

## 📖 Descripción

Este proyecto es una **API REST** que permite convertir un archivo **HTML** en un **PDF** utilizando **Express** y **Puppeteer**.

Admite la configuración de **encabezado**, **pie de página**, **márgenes** y **estilos personalizados** para generar PDF a medida.

## 🛠️ Cómo usar

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
NODE_ENV=development
LOG_LEVEL=debug
```

A continuación, se describen las variables de entorno.

| Variable  | Descripción                                                                        | Valores posibles                               |
| --------- | ---------------------------------------------------------------------------------- | ---------------------------------------------- |
| PORT      | Puerto en el que se ejecutará la aplicación                                        | 3000                                           |
| LOGS_DIR  | Dirección en la que se almacenarán los "logs". Estos son los mensajes del servidor | "logs"                                         |
| NODE_ENV  | Entorno de ejecución de la aplicación                                              | development, production, test                  |
| LOG_LEVEL | Nivel de detalle de los mensajes de la consola según la nomenclatura de Winston    | error, warn, info, http, verbose, debug, silly |

### Iniciar el servidor

Para ejecutar el servidor de la API:

```bash
npm start
```

Por defecto, el servidor se ejecuta en el puerto definido en el archivo .env o en el puerto 3000.

## 🚀 Configurar el Proyecto para Producción

Optamos por utilizar pm2 para el deploy del proyecto en lugar de Docker para facilitar el acceso de la aplicación al directorio de archivos.

### 1. Eliminar dependencias de desarrollo

Instalar solo las librerías listadas en el parámetro `dependencies` del `package.json` y
eliminar las librerías de desarrollo (listadas en `devDependencies`) si se encuentran instaladas. Esto se realiza mediante el siguiente comando:

```bash
npm install -g pm2
```

### 2. Ajustar variables de entorno

Cambiar las variables de entorno a los valores a usar en producción

```ini
PORT=8080
LOGS_DIR=logs
NODE_ENV=production
LOG_LEVEL=info
```

### 3. Instalar PM2

Luego, debes instalar PM2 globalmente en tu servidor o máquina de producción.

```bash
npm install -g pm2
```

### 4. Iniciar la Aplicación con PM2

Ahora que tienes PM2 instalado, puedes iniciar tu aplicación con él:

1. **Inicia tu aplicación usando PM2:**

```bash
pm2 start index.js --name "html-to-pdf-api"
```

Este comando le indica a PM2 que ejecute tu archivo index.js y le asigne el nombre html-to-pdf-api.

2. **Verifica que la aplicación se esté ejecutando:**

```bash
pm2 list
```

Este comando mostrará una lista de todos los procesos gestionados por PM2, incluyendo tu aplicación.

## ⚙️ Administrar la aplicación en producción

### Administración mediante scripts `.bat`

#### Iniciar aplicación

```cmd
cd C:\...\html-to-pdf\scripts
start.bat
```

#### Ver estado de la aplicación

```cmd
cd C:\...\html-to-pdf\scripts
status.bat
```

#### Ver logs de aplicación

```cmd
cd C:\...\html-to-pdf\scripts
logs.bat
```

#### Detener aplicación

```cmd
cd C:\...\html-to-pdf\scripts
stop.bat
```

#### Reiniciar aplicación

```cmd
cd C:\...\html-to-pdf\scripts
start.bat
```

### Administración mediante comandos de pm2

#### Monitoreo y Logs

PM2 ofrece una forma fácil de monitorear tu aplicación y acceder a los logs:

1. **Monitoreo en tiempo real de tu aplicación:**

```bash
pm2 monit
```

2. **Ver los logs de la aplicación:**

```bash
pm2 logs
```

3. **Ver logs específicos de la aplicación:**

```bash
pm2 logs html-to-pdf-api
```

#### Parar aplicación

Para detener tu aplicación:

```bash
pm2 stop html-to-pdf-api
```

#### Reiniciar aplicación

Para reiniciar tu aplicación:

```bash
pm2 restart html-to-pdf-api
```

#### Eliminar aplicación

```bash
pm2 delete html-to-pdf-api
```

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

#### Ejemplo de solicitud 1:

```json
{
  "html": "<div class='encabezado'>encabezado</div><div class='cuerpo'>cuerpo</div><div class='pie'>pie</div>",
  "outputPath": "C:/path/del/archivo/de/salida.pdf",
  "headerQuery": ".cabecera",
  "footerQuery": ".pie",
  "margin": {
    "top": "20mm",
    "bottom": "30mm"
  },
  "cssPath": "styles.css"
}
```

#### Ejemplo de solicitud 2:

```json
{
  "htmlSrc": "C:/path/al/html.html",
  "outputPath": "C:/path/del/archivo/de/salida.pdf",
  "headerQuery": ".cabecera",
  "footerQuery": ".pie",
  "margin": {
    "top": "20mm",
    "bottom": "30mm"
  },
  "cssPath": "styles.css"
}
```

#### 📌 Parámetros del cuerpo de la solicitud

| Parámetro     | Tipo     | Descripción                                                                                                                                   |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `html`        | `string` | (Opcional) HTML a transformar. Si no se incluye, htmlSrc es obligatorio.                                                                      |
| `htmlSrc`     | `string` | (Opcional) Ubicación del html a transformar a pdf. Si no se incluye, html es obligatorio.                                                     |
| `outputPath`  | `string` | Ubicación donde se almacenará el pdf creado                                                                                                   |
| `headerQuery` | `string` | (Opcional) Query que marca la ubicacion del encabezado. Por ejemplo, si el encabezado es `<div class="cabecera"></div>`, query = `.cabecera`. |
| `footerQuery` | `string` | (Opcional) Query que marca la ubicacion del pie de página. Véase headerQuery.                                                                 |
| `margin`      | `object` | (Opcional) Tamaño del encabezado y pie de página. Este argumento es obligatorio para que estos sean visibles.                                 |
| `cssPath`     | `string` | (Opcional) Ubicación del archivo de estilos a aplicar al cuerpo del PDF.                                                                      |

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
    "headerQuery": ".cabecera",
    "footerQuery": ".pie",
    "margin": { "top": "20mm", "bottom": "30mm" },
    "cssPath": "styles.css"
  }'
```

## 📂 Estructura del Proyecto

```bash
/config       -> Configuración del entorno y logger
/controllers  -> Capa que atrapa los endpoints de la APP
/scripts      -> Comandos utilizados en producción para administrar la app
/services     -> Funciones empleadas por los controladores para satisfacer los casos de uso
/utils        -> Utilidades adicionales (gestión de archivos, strings, etc.)

index.js      -> Punto de entrada de la aplicación. Define la app de Express.js
routes.js     -> Declaración de las rutas de la API y qué controladores las resuelven
```
