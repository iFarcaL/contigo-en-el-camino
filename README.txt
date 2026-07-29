SITIO — Contigo en el Camino
============================

Sube el CONTENIDO de esta carpeta "site/" a la raiz (public_html / www / wwwroot)
de tu hosting. Manten la estructura de carpetas tal cual.

Estructura y URLs resultantes:
  index.html                                              ->  /
  biblioteca/index.html                                   ->  /biblioteca/
  biblioteca/es-momento-de-buscar-acompanamiento/index.html
                                                          ->  /biblioteca/es-momento-de-buscar-acompanamiento/
  biblioteca/5-dimensiones-del-bienestar/index.html
                                                          ->  /biblioteca/5-dimensiones-del-bienestar/
  biblioteca/el-acompanamiento-no-depende-de-todos-tus-hermanos/index.html
                                                          ->  /biblioteca/el-acompanamiento-no-depende-de-todos-tus-hermanos/
  carta-de-navegacion/index.html                          ->  /carta-de-navegacion/
  encuesta/index.html                                     ->  /encuesta/
  vivir-en-grande/index.html                              ->  /vivir-en-grande/
  reddeespecialistas/index.html                           ->  /reddeespecialistas/

Cada archivo es autonomo (imagenes y estilos incluidos). No requiere base de datos
ni servidor especial: cualquier hosting estatico (Apache, Nginx, IIS, Netlify, etc.) sirve.

IMPORTANTE (Azure Static Web Apps):
  Incluye staticwebapp.config.json en la raiz. Sirve sitemap.xml como
  application/xml (Google Search Console lo rechazaba como "Invalid sitemap
  address" porque Azure lo devolvia como texto). Tambien fija Content-Type de
  robots.txt y excluye assets (.xml, .png, /uploads, /og, etc.) del
  navigationFallback para que no los reescriba a index.html. NO borrar este archivo.

PENDIENTES antes de publicar en produccion:
  1. [RESUELTO] WhatsApp Comunidad: linea dedicada +52 55 2078 0577 (Hero, CTA,
     guia 5-dimensiones y encuesta). VADV Del Valle +52 55 7940 5463 sigue siendo
     el contacto de aliado en el pie de guias y bloque aliado (sin cambios).
  2. [RESUELTO] /encuesta: iframe de Google Forms embebido real
     (docs.google.com/forms/.../viewform?embedded=true). Pagina rehecha como HTML
     plano (fuera del bundle) con nav y footer del sitio; conserva meta robots
     noindex. Alto del iframe fijado en 1400px; ajustar si el formulario se corta
     o deja demasiado espacio en blanco (depende del numero de preguntas).
  3. [RESUELTO] /vivir-en-grande: seccion 6 con iframe de Google Forms embebido real
     (docs.google.com/forms/1FAIpQLSf16fq.../viewform?embedded=true). Se reemplazo el
     formulario placeholder y su script de "Gracias". Alto del iframe = 1150px (menos
     preguntas que la encuesta); ajustar si se corta o sobra espacio. NOTA perfil B
     (adulto mayor): la legibilidad y contraste del formulario embebido se controlan
     desde el editor de Google Forms (tema, tamano de fuente) — no por CSS externo,
     porque el iframe es cross-origin. Revisar el tema en Forms antes de publicar.
  4. [RESUELTO] Guia: botones de descarga PDF apuntan a las URLs reales en
     bibliotecacontigo.blob.core.windows.net (acompanamiento y 5-dimensiones).
  5. [RESUELTO] Footer: Facebook y Instagram apuntan a
     facebook.com/contigoenelcaminomx/ e instagram.com/contigoenelcaminomx/.
  6. Nueva pagina /carta-de-navegacion/ (Carta de Navegacion) enlazada desde el footer.
  7. Nueva pagina /reddeespecialistas/ (Red de Especialistas y Aliados), en el menu y
     el footer. Contacto de aliado VADV Del Valle con mensaje prellenado.
  8. Footer: nueva seccion Contacto con WhatsApp y correo hola@contigoenelcamino.com.
  9. [RESUELTO] /reddeespecialistas: imagen Open Graph og/og-especialistas.png generada.
 10. Nueva guia /biblioteca/el-acompanamiento-no-depende-de-todos-tus-hermanos/
     (decision familiar). PDF en blob (contenedor biblioteca), OG og/og-guia-decision-familiar.png.
 11. Guias: fecha de publicacion visible en la pagina (24 jul / 26 jul / 28 jul 2026).
     La fecha NO aparece en los PDFs descargables, solo en el HTML.
 12. Rendimiento Home: imagenes hero y caminata convertidas a WebP con variantes
     responsivas (hero movil 30 KB vs 2 MB del PNG). Un solo <picture> con
     <source media> sirve la version ligera en movil, fetchpriority=high y
     <link rel=preload> del hero en el <head>; caminata con srcset + loading=lazy.
     Los .png originales se conservan como respaldo pero el HTML ya usa .webp.
