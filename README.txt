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
  2. [ELIMINADA] /encuesta: la pagina se retiro del sitio. El boton "Responde la
     encuesta" (Hero de Home) y el link del footer ahora apuntan DIRECTO al Google
     Form (docs.google.com/forms/1FAIpQLSdMEsmxq.../viewform, target=_blank). Se quito
     tambien el Disallow /encuesta/ de robots.txt. No queda ningun enlace a /encuesta.
  3. [RESUELTO] /vivir-en-grande: seccion 6 con boton "Quiero unirme al Club" que abre
     el Google Form real (docs.google.com/forms/1FAIpQLSf16fq.../viewform, target=_blank).
     Se reemplazo el iframe/placeholder anterior. Boton grande para perfil B (adulto mayor).
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
