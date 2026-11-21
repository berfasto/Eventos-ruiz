# Plan y Herramientas SEO — Eventos Ruiz (La Paz, Bolivia)

Esta guía conecta las **4 herramientas SEO** con la implementación técnica ya integrada en tu código.

---

## Resumen operativo

| Herramienta | Aspecto a evaluar | Qué ya está implementado en el código | Frecuencia |
| :--- | :--- | :--- | :--- |
| **Google Keyword Planner** | Palabras clave en Bolivia | Títulos (`<title>`), `meta description`, `<h1>`, Open Graph y textos `alt` redactados con búsquedas reales de Bolivia y La Paz en las 5 páginas. | Única vez al iniciar |
| **Google PageSpeed Insights** | Velocidad móvil y peso de fotos | `preload` de la foto principal, `fetchpriority="high"`, `loading="lazy"`, `decoding="async"`, dimensiones exactas y script `scripts/seo-audit.ps1 -Compress`. | Ante cada actualización |
| **Google Search Console** | Indexación y clics orgánicos | Etiqueta `google-site-verification` lista en `index.html`, archivos `robots.txt` y `sitemap.xml`, más URLs canónicas. | Quincenal |
| **Google Business Profile** | Vistas en mapa y contacto | Datos estructurados **JSON-LD (`LocalBusiness` + `EventPlanner` + `FAQPage`)** apuntando a **Zona 23 de Marzo, La Paz, Bolivia**, teléfono `67044713` y cobertura local. | Semanal |

---

## 1. Google Keyword Planner (Única vez al iniciar)

Palabras clave de intención comercial en **Bolivia / La Paz** ya integradas en las etiquetas HTML:
- **Inicio (`index.html`)**: *decoración de eventos en La Paz Bolivia, decoración de bodas La Paz, 15 años, bautizos, licenciamientos, Zona 23 de Marzo*.
- **Eventos y Galería (`eventos.html`)**: *montajes de bodas, decoración de 15 años La Paz, decoración de licenciamientos, bautizos y baby shower Bolivia*.
- **Paquetes y Cotizador (`cotizador.html`)**: *precios de decoración de eventos en Bolivia, paquetes de decoración La Paz, cotizador de eventos en bolivianos*.
- **Reservas (`reservas.html`)**: *reservar decoración de eventos La Paz, disponibilidad para bodas y 15 años Bolivia*.
- **Contacto (`contacto.html`)**: *Eventos Ruiz Zona 23 de Marzo La Paz, teléfono 67044713, decoración de salones en La Paz*.

Si investigas términos nuevos en [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/) (filtrando ubicación **Bolivia** e idioma **Español**), actualiza los `<title>` y `meta description` en tus archivos `.html`.

---

## 2. Google PageSpeed Insights (Ante cada actualización)

Antes de subir cambios o fotos nuevas a GitHub:

1. Ejecuta la auditoría local:
   ```powershell
   .\scripts\seo-audit.ps1
   ```
2. Si alguna foto pesa más de `150 KB`, comprímela automáticamente en un paso (guarda respaldo en `.img-backup/`):
   ```powershell
   .\scripts\seo-audit.ps1 -Compress
   ```
3. Sube a GitHub y analiza tu URL pública en [PageSpeed Insights](https://pagespeed.web.dev/) enfocándote en la pestaña **Móvil**.

---

## 3. Google Search Console (Quincenal)

1. Publica el proyecto en **GitHub Pages** (`Settings → Pages → Branch: main`).
   > El archivo principal ya está en minúsculas (`index.html`) para evitar errores 404 en GitHub Pages.
2. Abre [Google Search Console](https://search.google.com/search-console) → **Añadir propiedad** → **Prefijo de URL** con tu enlace de GitHub Pages.
3. Elige verificación por **Etiqueta HTML**, copia el valor de `content="..."` y ejecuta en PowerShell:
   ```powershell
   .\scripts\set-domain.ps1 -Url "https://berfasto.github.io/Eventos-ruiz" -SearchConsoleCode "TU_CODIGO_AQUI"
   ```
4. Sube los cambios a GitHub y pulsa **Verificar** en Search Console.
5. En el menú **Sitemaps**, envía `sitemap.xml` y usa **Inspección de URLs → Solicitar indexación** para `index.html`, `eventos.html` y `reservas.html`.
6. Cada 15 días revisa **Rendimiento** para ver qué búsquedas en Bolivia traen más clics.

---

## 4. Google Business Profile (Semanal)

1. Crea tu ficha gratuita en [Google Business Profile](https://www.google.com/business/):
   - **Nombre**: `Eventos Ruiz — Decoración de Eventos`
   - **Categoría principal**: `Planificador de eventos` / `Servicio de decoración para fiestas`
   - **Dirección**: `Zona 23 de Marzo, La Paz, Bolivia`
   - **Área de servicio**: La Paz, Zona 23 de Marzo, Zona Sur, Sopocachi, Miraflores, Achumani y El Alto
   - **Teléfono**: `+591 67044713`
   - **Sitio web**: tu URL de GitHub Pages
2. Cuando Google active tu ficha, copia el enlace de compartir del mapa y vincúlalo a la web con:
   ```powershell
   .\scripts\set-domain.ps1 -Url "https://berfasto.github.io/Eventos-ruiz" -GoogleBusinessUrl "https://maps.app.goo.gl/TU_ENLACE"
   ```
3. **Rutina semanal**: sube 2–3 fotos reales de tus montajes de la semana, responde reseñas de clientes y publica una novedad con enlace directo a `reservas.html`.
