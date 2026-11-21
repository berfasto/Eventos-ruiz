# Eventos Ruiz — Sitio Web Multipágina

Arquitectura moderna, minimalista y modular para **Eventos Ruiz · Calidad y Presencia** (La Paz, Bolivia).

## Estructura del proyecto (pestañas en archivos independientes)

```text
Eventos ruiz/
├── index.html                      # Pestaña 01: Inicio (minúscula para GitHub Pages)
├── eventos.html                    # Pestaña 02: Especialidades y Galería + Lightbox + Favoritos
├── cotizador.html                  # Pestaña 03: Paquetes y Cotizador en tiempo real
├── reservas.html                   # Pestaña 04: Calendario interactivo y Pase de Pre-Reserva
├── contacto.html                   # Pestaña 05: Mapa 23 de Marzo, contacto directo y FAQ
├── robots.txt / sitemap.xml        # Indexación para Google Search Console
├── site.webmanifest                # Metadatos móviles y marca
├── SEO_GUIA.md                     # Guía paso a paso de Keyword Planner, PageSpeed, Search Console y Business Profile
├── scripts/                        # seo-audit.ps1 (PageSpeed + auditoría) y set-domain.ps1 (URL GitHub Pages)
├── dev.ps1                         # Servidor local instantáneo (Python http.server)
└── assets/
    ├── IMG/                        # Logotipo (Logo.jpg) y 10 fotografías reales de montajes
    ├── css/
    │   ├── tokens.css              # Paleta moderna, tipografía (Bricolage Grotesque + DM Sans + JetBrains Mono), radios y curvas
    │   ├── base.css                # Reset, animaciones de scroll-reveal, cortina de transición y marquee
    │   ├── shell.css               # Navbar unificada, menú móvil, footer, botón flotante WhatsApp y toast
    │   ├── components.css          # Botones, tarjetas spotlight, chips con color dinámico, formularios y Lightbox
    │   └── pages.css               # Layouts dedicados por página y responsive
    └── js/
        ├── core/
        │   ├── data.js             # Fuente única de verdad (teléfono, eventos, precios, galería, FAQs)
        │   ├── utils.js            # Utilidades DOM, WhatsApp, portapapeles, parámetros URL y estado entre pestañas
        │   ├── shell.js            # Renderiza Navbar/Footer/Drawer compartidos y transiciones entre páginas
        │   └── motion.js           # Scroll-reveal, contadores animados, spotlight reactivo y barra de progreso
        └── pages/
            ├── home.js             # Lógica de index.html
            ├── eventos.js          # Lógica de eventos.html
            ├── cotizador.js        # Lógica de cotizador.html
            ├── reservas.js         # Lógica de reservas.html
            └── contacto.js         # Lógica de contacto.html
```

## Flujo de trabajo optimizado

- **Un solo lugar para actualizar datos**: edita `assets/js/core/data.js` para cambiar teléfono, precios, paquetes, agregar fotos a `IMG/` o actualizar preguntas frecuentes; las 5 páginas se actualizan solas.
- **Un solo lugar para la navegación y el pie de página**: `assets/js/core/shell.js` inyecta la barra superior, el menú móvil y el footer en todas las páginas automáticamente.
- **Conexión inteligente entre pestañas**:
  - La barra rápida en `index.html` lleva el evento, fecha e invitados directo a `reservas.html`.
  - Desde cualquier foto o especialidad en `eventos.html` se puede saltar directo a cotizar o reservar ese tipo de evento.
  - La cotización armada en `cotizador.html` se guarda automáticamente al pulsar **"Continuar a Reservar Fecha"** y aparece vinculada en `reservas.html`.

## Sitio publicado (GitHub Pages)

- **URL pública**: `https://berfasto.github.io/Eventos-ruiz/`

## Vista previa local

Funciona tanto haciendo doble clic en `index.html` como ejecutando el servidor local:

```powershell
.\dev.ps1
```
