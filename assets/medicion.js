(function () {
  'use strict';
  var key = 'cc_preferencia_medicion_v1';
  var measurementId = 'G-X6H9QE31MJ';
  var active = false;
  var choice = null;
  var panel;
  var status;

  function readChoice() {
    try {
      var value = localStorage.getItem(key);
      return value === 'accepted' || value === 'rejected' ? value : null;
    } catch (_) { return null; }
  }

  function loadAnalytics() {
    if (active || choice !== 'accepted') return;
    active = true;
    window['ga-disable-' + measurementId] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(script);
  }

  function clearAnalyticsCookies() {
    var hosts = location.hostname.split('.');
    var domains = [''];
    for (var i = 0; i < hosts.length - 1; i++) domains.push('.' + hosts.slice(i).join('.'));
    var parts = location.pathname.split('/');
    var paths = ['/'];
    for (var j = 1; j < parts.length; j++) paths.push(parts.slice(0, j + 1).join('/') || '/');
    document.cookie.split(';').forEach(function (entry) {
      var name = entry.split('=')[0].trim();
      if (name !== '_ga' && name.indexOf('_ga_') !== 0) return;
      paths.forEach(function (path) { domains.forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=' + path + (domain ? '; domain=' + domain : '') + '; SameSite=Lax';
      }); });
    });
  }

  function saveChoice(value) {
    var wasActive = active;
    if (value === 'rejected') {
      window['ga-disable-' + measurementId] = true;
      active = false;
      clearAnalyticsCookies();
    }
    try {
      localStorage.setItem(key, value);
      if (localStorage.getItem(key) !== value) throw new Error('preference not saved');
    } catch (_) {
      choice = null;
      status.textContent = 'No pudimos guardar tu elección en este navegador. La medición permanecerá desactivada en esta página; revisa la configuración de almacenamiento del navegador.';
      window['ga-disable-' + measurementId] = true;
      active = false;
      return;
    }
    choice = value;
    status.textContent = '';
    panel.hidden = true;
    if (value === 'accepted') loadAnalytics();
    else if (wasActive) location.reload();
  }

  function init() {
    choice = readChoice();
    panel = document.createElement('section');
    panel.className = 'cc-medicion';
    panel.setAttribute('aria-labelledby', 'cc-medicion-titulo');
    panel.innerHTML = '<div class="cc-medicion-cabecera"><h2 id="cc-medicion-titulo">Tu elección sobre la medición</h2><button type="button" class="cc-medicion-cerrar" aria-label="Cerrar y decidir después">×</button></div>' +
      '<p>Con tu permiso usamos Google Analytics para entender y mejorar el sitio. Puedes usarlo sin aceptar y cambiar tu elección cuando quieras.</p>' +
      '<p><a href="/aviso-de-privacidad/#cookies">Conoce cómo usamos estas tecnologías</a></p>' +
      '<div class="cc-medicion-opciones"><button type="button" data-cc-choice="accepted">Aceptar medición</button><button type="button" data-cc-choice="rejected">Rechazar medición</button></div>' +
      '<p class="cc-medicion-estado" role="status" aria-live="polite"></p>';
    panel.hidden = choice !== null;
    document.body.appendChild(panel);
    status = panel.querySelector('.cc-medicion-estado');
    panel.querySelector('[data-cc-choice="accepted"]').addEventListener('click', function () { saveChoice('accepted'); });
    panel.querySelector('[data-cc-choice="rejected"]').addEventListener('click', function () { saveChoice('rejected'); });
    panel.querySelector('.cc-medicion-cerrar').addEventListener('click', function () { panel.hidden = true; });
    document.querySelectorAll('[data-cc-preferencias]').forEach(function (button) {
      button.addEventListener('click', function () {
        panel.hidden = false;
        status.textContent = choice === 'accepted' ? 'Tu elección actual: aceptas la medición.' : choice === 'rejected' ? 'Tu elección actual: rechazas la medición.' : 'Aún no has elegido.';
        panel.querySelector('[data-cc-choice="accepted"]').focus();
      });
    });
    document.addEventListener('click', function (event) {
      if (!active || choice !== 'accepted') return;
      var a = event.target && event.target.closest ? event.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var name = null;
      if (a.hasAttribute('data-pdf')) {
        var path = location.pathname;
        name = path.indexOf('5-dimensiones') > -1 ? 'click_descarga_guia_5dimensiones' :
          (path.indexOf('hermanos') > -1 || path.indexOf('no-depende') > -1) ? 'click_descarga_guia_decision_familiar' : 'click_descarga_guia_acompanamiento';
      } else if (href.indexOf('1FAIpQLSdMEsmxq') > -1) name = 'click_encuesta';
      else if (href.indexOf('1FAIpQLSf16fq') > -1) name = 'click_unirme_club';
      else if (href.indexOf('wa.me/525579405463') > -1) name = 'click_whatsapp_vadv';
      else if (href.indexOf('wa.me/525520780577') > -1) name = a.closest('footer') ? 'click_whatsapp_footer' : 'click_whatsapp_comunidad';
      if (name) window.gtag('event', name);
    }, true);
    window.addEventListener('storage', function (event) {
      if (event.key !== key && event.key !== null) return;
      var updated = readChoice();
      if (updated !== 'accepted' && active) {
        window['ga-disable-' + measurementId] = true;
        active = false;
        clearAnalyticsCookies();
        location.reload();
        return;
      }
      choice = updated;
      panel.hidden = choice !== null;
      if (choice === 'accepted') loadAnalytics();
    });
    if (choice === 'accepted') loadAnalytics();
  }
  init();
}());
