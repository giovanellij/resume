// Minimal, dependency-free enhancements.
(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var nav = document.querySelector('.nav');

  // ---------------------------------------------------------------------------
  // i18n — English lives in the HTML (default / SEO baseline); Spanish here.
  // Only [data-i18n] leaf nodes are swapped (innerHTML), so inline <strong>,
  // links and nested date spans are preserved via their own keys.
  // ---------------------------------------------------------------------------
  var ES = {
    'skip': 'Saltar al contenido',

    'nav.about': 'Perfil',
    'nav.experience': 'Experiencia',
    'nav.skills': 'Aptitudes',
    'nav.education': 'Educación',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',

    'hero.eyebrow': 'Ingeniero de Software · Tech Lead',
    'hero.lede': 'Soy ingeniero de software y tech lead al que le apasiona convertir problemas complejos en productos que la gente realmente disfruta usar. Me importa hacer las cosas bien y ayudar a crecer a mi equipo.',
    'hero.cv': 'Descargar CV',

    'about.eyebrow': 'Perfil',
    'about.title': 'Resumen',
    'about.body': 'Ingeniero de software full-stack con más de 9 años construyendo aplicaciones web escalables y mantenibles. Actualmente Tech Lead. Sólida experiencia en .NET, Angular y Node.js, diseñando sistemas de facturación, cotización y pagos, integrando servicios de terceros y de IA, y operando microservicios cloud-native en GCP (GKE / Kubernetes). Con experiencia liderando y mentoreando equipos multifuncionales y usando herramientas de IA para acelerar la entrega. Construí sistemas de facturación que hoy procesan <strong>cerca de US$1M en ingresos recurrentes mensuales</strong>, contribuyendo a una <strong>Serie A de US$10M</strong>. Apasionado por la arquitectura limpia, TDD y el aprendizaje continuo.',

    'exp.eyebrow': 'Experiencia',
    'exp.title': 'Trayectoria',
    'exp.viirtue.role': 'Ingeniero de Software / Tech Lead',
    'exp.viirtue.date': 'Ene 2022 — Presente',
    'exp.tl.date': 'Nov 2023 — Presente',
    'exp.tl.b1': 'Lideré un equipo de desarrollo multifuncional de <strong>hasta 12 ingenieros</strong>, coordinando con áreas de toda la organización para entregar funcionalidades de forma efectiva en ViiBE, la plataforma white-label de quote-to-cash de Viirtue — hoy adoptada por <strong>más de 180 partners (~65% de la base)</strong>.',
    'exp.tl.b2': 'Diseñé y entregué la integración end-to-end de un agente de voz con IA en la plataforma, capturando el uso por llamada y automatizando la facturación de las llamadas con IA — abriendo una nueva fuente de ingresos basada en consumo.',
    'exp.tl.b3': 'Refactoricé todo el sistema de reportes hacia una solución más robusta, estandarizada y funcional, mejorando la confiabilidad y consistencia de los reportes de ingresos, consumo y cuentas por cobrar.',
    'exp.tl.b4': 'Trabajé directamente con clientes para resolver problemas complejos y específicos de cada cuenta, diseñando soluciones a medida y mejorando la satisfacción del cliente.',
    'exp.tl.b5': 'Mentoreé a compañeros mediante pair programming e intercambio de conocimiento, fomentando un ambiente colaborativo donde el equipo aprende en conjunto.',
    'exp.se.role': 'Ingeniero de Software',
    'exp.se.date': 'Ene 2022 — Nov 2023',
    'exp.se.b1': 'Construí un portal para clientes finales que les permite seguir sus facturas y pagos en tiempo real, integrando Stripe y Authorize.Net para el procesamiento de pagos y reduciendo las consultas de soporte de facturación.',
    'exp.se.b2': 'Reconstruí el sistema de facturación desde cero, mejorando la confiabilidad y precisión de la facturación automática recurrente y por consumo — hoy procesando la facturación mensual de <strong>más de 3.000 cuentas</strong> y <strong>cerca de US$1M en ingresos recurrentes mensuales</strong>.',
    'exp.se.b3': 'Reconstruí el sistema de cotizaciones, agregando firma electrónica para que los clientes firmen las cotizaciones online y acortando el ciclo de cierre.',
    'exp.se.b4': 'Implementé un sistema automatizado de notificaciones a clientes (estados de factura y confirmaciones de pago) para reducir el seguimiento manual.',
    'exp.se.b5': 'Construí una integración con Rev.io e implementé almacenamiento de documentos en Microsoft Azure para extender las capacidades de facturación y almacenamiento de la plataforma.',
    'exp.se.b6': 'Mantuve y operé microservicios cloud-native en GCP, containerizados y desplegados en Kubernetes (GKE), dentro de un monorepo aplicando TDD.',
    'exp.inamika.role': 'Ingeniero de Software',
    'exp.inamika.date': 'Mar 2020 — Dic 2021',
    'exp.inamika.b1': 'Trabajé en una aplicación web incremental con ASP.NET Core, ABP, MySQL y Angular para gestionar pedidos de distintos canales de venta.',
    'exp.inamika.b2': 'Desarrollé una aplicación web para medir el progreso y crecimiento de la empresa.',
    'exp.inamika.b3': 'Ayudé a mejorar la infraestructura con servicios de AWS (Lambda, EC2, CloudTrail).',
    'exp.wb.role': 'Ingeniero de Software',
    'exp.wb.date': 'Ene 2016 — Feb 2020',
    'exp.wb.b1': 'Introduje la metodología Scrum y actué como líder de equipo en proyectos de nuevos clientes.',
    'exp.wb.b2': 'Desarrollé aplicaciones ASP.NET MVC aplicando SOLID, Entity Framework y Angular para un software mantenible, escalable y testeable.',
    'exp.wb.b3': 'Construí una plataforma de venta de pasajes (“RosarioBus”), una plataforma de e-learning (“Fray Luis Beltrán”) y una plataforma de e-commerce (“Wienner”/“Metrolab”), usando ASP.NET (Core) MVC, Entity Framework, Angular, TDD, Scrum e IdentityServer.',

    'skills.eyebrow': 'Aptitudes',
    'skills.title': 'Herramientas y prácticas',
    'grp.languages': 'Lenguajes',
    'grp.data': 'Datos',
    'grp.integrations': 'Integraciones',
    'grp.practices': 'Prácticas',
    'grp.ai': 'Herramientas de IA',
    'grp.soft': 'Habilidades blandas',
    'tag.aivoice': 'Agentes de voz con IA',
    'tag.designpatterns': 'Patrones de diseño',
    'tag.microservices': 'Microservicios',
    'tag.leadership': 'Liderazgo de equipos',
    'tag.mentorship': 'Mentoría',
    'tag.crossfunc': 'Colaboración multifuncional',
    'tag.learning': 'Aprendizaje continuo',
    'tag.positive': 'Actitud positiva',

    'edu.eyebrow': 'Educación',
    'edu.title': 'Educación',
    'edu.se.title': 'Ingeniería en Sistemas',
    'edu.se.note': '(en curso)',
    'edu.se.body': 'Cursado completo; una materia pendiente.',
    'edu.hs.title': 'Bachillerato con orientación en Gestión',

    'proj.eyebrow': 'Proyectos',
    'proj.title': 'Proyectos destacados',
    'proj.featured.badge': 'Destacado · En vivo',
    'proj.maria.body': 'PWA de e-commerce para un negocio de frutos secos, mixes y miel artesanal con entrega a domicilio — catálogo de productos, carrito, cuentas de clientes y gestión de pedidos, desarrollada como app híbrida web / PWA / móvil y desplegada en Firebase.',
    'proj.maria.cta': 'Ver sitio →',
    'proj.linead.body': 'Plataforma web/móvil para turnos médicos y un CRM de seguimiento de pacientes.',
    'proj.mountain.body': 'Módulos de seguimiento de ingredientes y materias primas.',
    'proj.hoteliga.body': 'Módulos de integración de pagos, calendario de reservas e identidad/seguridad para una plataforma de gestión hotelera.',

    'contact.eyebrow': 'Contacto',
    'contact.title': 'Hablemos',
    'contact.lbl.languages': 'Idiomas',
    'contact.langs': 'Español (nativo) · Inglés (nivel profesional)',
    'contact.cv': 'Descargar CV en PDF →',

    'footer.top': 'Volver arriba ↑'
  };

  // Head/attribute-level strings that aren't plain [data-i18n] nodes.
  var META = {
    en: {
      title: 'Julian Giovanelli — Software Engineer',
      desc: 'Julian Giovanelli — Full-stack Software Engineer and Tech Lead, 9+ years across .NET, Angular and Node.js. Built billing systems now processing ~$1M MRR on GCP microservices, contributing to a $10M Series A.',
      cvHref: 'docs/CV_Julian_Giovanelli_SoftwareEngineer.pdf',
      cvName: 'Julian_Giovanelli_CV.pdf',
      themeToDark: 'Switch to dark mode',
      themeToLight: 'Switch to light mode'
    },
    es: {
      title: 'Julian Giovanelli — Ingeniero de Software',
      desc: 'Julian Giovanelli — Ingeniero de Software full-stack y Tech Lead, más de 9 años en .NET, Angular y Node.js. Construí sistemas de facturación que hoy procesan ~US$1M de ingresos recurrentes mensuales en microservicios sobre GCP, contribuyendo a una Serie A de US$10M.',
      cvHref: 'docs/CV_Julian_Giovanelli_SoftwareEngineer_ES.pdf',
      cvName: 'Julian_Giovanelli_CV_ES.pdf',
      themeToDark: 'Cambiar a modo oscuro',
      themeToLight: 'Cambiar a modo claro'
    }
  };

  var i18nNodes = document.querySelectorAll('[data-i18n]');
  var originals = {};
  for (var i = 0; i < i18nNodes.length; i++) {
    originals[i18nNodes[i].getAttribute('data-i18n')] = i18nNodes[i].innerHTML;
  }

  var lang = detectLang();

  function detectLang() {
    try {
      var p = new URLSearchParams(location.search).get('lang');
      if (p === 'es' || p === 'en') return p;
      var stored = localStorage.getItem('lang');
      if (stored === 'es' || stored === 'en') return stored;
    } catch (e) {}
    return (navigator.language || 'en').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  }

  function applyLang(next) {
    lang = next;
    // Text nodes
    for (var j = 0; j < i18nNodes.length; j++) {
      var el = i18nNodes[j];
      var key = el.getAttribute('data-i18n');
      var val = next === 'es' ? ES[key] : undefined;
      el.innerHTML = (val != null) ? val : originals[key];
    }
    // Document + head
    var m = META[next] || META.en;
    root.setAttribute('lang', next);
    document.title = m.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', m.desc);
    // CV links (href + download filename)
    var cvs = document.querySelectorAll('[data-cv]');
    for (var k = 0; k < cvs.length; k++) {
      cvs[k].setAttribute('href', m.cvHref);
      cvs[k].setAttribute('download', m.cvName);
    }
    // Language toggle state
    var lbtns = document.querySelectorAll('.lang-toggle__btn');
    for (var l = 0; l < lbtns.length; l++) {
      lbtns[l].setAttribute('aria-pressed', String(lbtns[l].getAttribute('data-lang') === next));
    }
    syncToggle();
  }

  function setLang(next) {
    if (next !== 'es' && next !== 'en') return;
    applyLang(next);
    try { localStorage.setItem('lang', next); } catch (e) {}
    try {
      var url = new URL(location.href);
      url.searchParams.set('lang', next);
      history.replaceState(null, '', url);
    } catch (e) {}
  }

  var langBtns = document.querySelectorAll('.lang-toggle__btn');
  for (var b = 0; b < langBtns.length; b++) {
    langBtns[b].addEventListener('click', function () {
      setLang(this.getAttribute('data-lang'));
    });
  }

  // --- Dark mode toggle (theme already applied pre-paint in <head>) ---
  function syncToggle() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    var m = META[lang] || META.en;
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? m.themeToLight : m.themeToDark);
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
      } else {
        root.setAttribute('data-theme', 'dark');
      }
      try { localStorage.setItem('theme', isDark ? 'light' : 'dark'); } catch (e) {}
      syncToggle();
    });
  }

  // Apply the detected language once (also syncs the theme toggle aria).
  applyLang(lang);

  // --- Subtle border on the sticky nav once scrolled ---
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- Back-to-top / brand links ---
  // #top sits on the sticky header, which is always in view, so a plain anchor
  // jump is a no-op. Scroll the window explicitly instead (CSS scroll-behavior
  // makes it smooth, and auto under prefers-reduced-motion).
  var topLinks = document.querySelectorAll('a[href="#top"]');
  Array.prototype.forEach.call(topLinks, function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0 });
      if (window.history && history.replaceState) {
        var url = new URL(location.href);
        url.hash = '';
        history.replaceState(null, '', url.pathname + url.search);
      }
    });
  });

  // --- Footer year ---
  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
