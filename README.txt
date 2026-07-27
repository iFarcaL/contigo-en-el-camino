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
  carta-de-navegacion/index.html                          ->  /carta-de-navegacion/
  encuesta/index.html                                     ->  /encuesta/
  vivir-en-grande/index.html                              ->  /vivir-en-grande/

Cada archivo es autonomo (imagenes y estilos incluidos). No requiere base de datos
ni servidor especial: cualquier hosting estatico (Apache, Nginx, IIS, Netlify, etc.) sirve.

PENDIENTES antes de publicar en produccion:
  1. [RESUELTO] WhatsApp Comunidad: linea dedicada +52 55 2078 0577 (Hero, CTA,
     guia 5-dimensiones y encuesta). VADV Del Valle +52 55 7940 5463 sigue siendo
     el contacto de aliado en el pie de guias y bloque aliado (sin cambios).
  2. /encuesta: reemplazar el iframe placeholder por la URL real de Microsoft Forms.
  3. /vivir-en-grande: conectar el formulario de interes a un servicio real.
  4. [RESUELTO] Guia: botones de descarga PDF apuntan a las URLs reales en
     bibliotecacontigo.blob.core.windows.net (acompanamiento y 5-dimensiones).
  5. [RESUELTO] Footer: Facebook y Instagram apuntan a
     facebook.com/contigoenelcaminomx/ e instagram.com/contigoenelcaminomx/.
  6. Nueva pagina /carta-de-navegacion/ (Carta de Navegacion) enlazada desde el footer.
