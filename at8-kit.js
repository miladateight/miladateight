/*
  AT8 shared kit (vanilla JS) — single source of truth for navigation,
  the project registry, language persistence, and a few motion helpers.
  Every page on ateight.xyz (the React home page and every project page,
  each living in its own repository) loads this file from
  https://ateight.xyz/at8-kit.js so they share one real implementation
  instead of four hand-copied ones that drift apart over time.
*/
(function () {
  "use strict";

  var LANG_KEY = "at8:lang";
  var LANGS = ["en", "fa", "ar", "de"];

  var PROJECTS = [
    {
      slug: "keyfix",
      path: "/KeyFix/",
      title: "KeyFix",
      accent: "keyfix",
      type: {
        en: "Privacy-first Windows utility",
        fa: "ابزار ویندوز با تمرکز بر حریم خصوصی",
        ar: "أداة Windows تركز على الخصوصية",
        de: "Datenschutzfreundliches Windows-Tool"
      }
    },
    {
      slug: "netdoctor",
      path: "/NetDoctor/",
      title: "NetDoctor",
      accent: "netdoctor",
      type: {
        en: "Network diagnosis and safe repair",
        fa: "تشخیص شبکه و ترمیم امن",
        ar: "تشخيص الشبكة وإصلاح آمن",
        de: "Netzwerkdiagnose und sichere Reparatur"
      }
    },
    {
      slug: "hybrid-web-mail-infrastructure",
      path: "/hybrid-web-mail-infrastructure/",
      title: "Hybrid Web & Mail Infrastructure",
      accent: "hwmi",
      type: {
        en: "Production case study",
        fa: "مطالعه موردی عملیاتی",
        ar: "دراسة حالة تشغيلية",
        de: "Praxisnaher Betriebsfall"
      }
    },
    {
      slug: "instagram-youtube-soundcloud-downloader",
      path: "/instagram-youtube-soundcloud-downloader/",
      title: "Media Downloader Bot",
      accent: "downloader",
      type: {
        en: "Telegram automation",
        fa: "اتوماسیون تلگرام",
        ar: "أتمتة Telegram",
        de: "Telegram-Automation"
      }
    }
  ];

  var NAV_COPY = {
    en: {
      dir: "ltr",
      navHome: "Home",
      navAbout: "About Me",
      navProjects: "Projects",
      navContact: "Contact Me",
      menuTitle: "Projects",
      menuLead: "Live project pages and source repositories.",
      openMenu: "Open navigation",
      closeMenu: "Close navigation"
    },
    fa: {
      dir: "rtl",
      navHome: "خانه",
      navAbout: "درباره من",
      navProjects: "پروژه‌ها",
      navContact: "تماس با من",
      menuTitle: "پروژه‌ها",
      menuLead: "صفحه‌های فعال پروژه‌ها و ریپازیتوری‌های اصلی.",
      openMenu: "باز کردن منو",
      closeMenu: "بستن منو"
    },
    ar: {
      dir: "rtl",
      navHome: "الرئيسية",
      navAbout: "من أنا",
      navProjects: "المشاريع",
      navContact: "تواصل معي",
      menuTitle: "المشاريع",
      menuLead: "صفحات المشاريع المباشرة والمستودعات الأساسية.",
      openMenu: "فتح التنقل",
      closeMenu: "إغلاق التنقل"
    },
    de: {
      dir: "ltr",
      navHome: "Home",
      navAbout: "About Me",
      navProjects: "Projects",
      navContact: "Contact Me",
      menuTitle: "Projekte",
      menuLead: "Live-Projektseiten und die zugehörigen Repositories.",
      openMenu: "Navigation öffnen",
      closeMenu: "Navigation schließen"
    }
  };

  function getSavedLanguage() {
    try {
      var saved = window.localStorage.getItem(LANG_KEY);
      if (saved && LANGS.indexOf(saved) !== -1) return saved;
    } catch (err) {
      /* localStorage unavailable (privacy mode) — fall back to default */
    }
    return "en";
  }

  function saveLanguage(lang) {
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch (err) {
      /* ignore write failures */
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function buildHeaderHtml(lang) {
    var t = NAV_COPY[lang] || NAV_COPY.en;
    var menuItems = PROJECTS.map(function (project) {
      return (
        '<a href="' +
        project.path +
        '"><span>' +
        escapeHtml(project.title) +
        "</span><small>" +
        escapeHtml(project.type[lang] || project.type.en) +
        "</small></a>"
      );
    }).join("");

    var drawerProjects = PROJECTS.map(function (project) {
      return (
        '<a href="' +
        project.path +
        '"><span>' +
        escapeHtml(project.title) +
        "</span><small>" +
        escapeHtml(project.type[lang] || project.type.en) +
        "</small></a>"
      );
    }).join("");

    var langButtons = LANGS.map(function (key) {
      return (
        '<button type="button" data-at8-lang-btn="' +
        key +
        '" aria-pressed="' +
        (key === lang ? "true" : "false") +
        '">' +
        ({ en: "English", fa: "فارسی", ar: "العربية", de: "Deutsch" })[key] +
        "</button>"
      );
    }).join("");

    return (
      '<header class="at8-topbar">' +
      '<a class="at8-brand" href="/">' +
      '<span class="at8-brand-mark"><img src="https://ateight.xyz/at8-logo.png" alt="" aria-hidden="true" /></span>' +
      '<span class="at8-brand-text"><strong>Milad</strong><small>AT8</small></span>' +
      "</a>" +
      '<nav class="at8-nav" aria-label="Main navigation">' +
      '<a href="/" data-at8-link="home">' +
      escapeHtml(t.navHome) +
      "</a>" +
      '<a href="/#about" data-at8-link="about">' +
      escapeHtml(t.navAbout) +
      "</a>" +
      '<div class="at8-menu" data-at8-menu>' +
      '<a href="/#projects" data-at8-link="projects">' +
      escapeHtml(t.navProjects) +
      "</a>" +
      '<div class="at8-menu-panel">' +
      '<div class="at8-menu-intro"><strong>' +
      escapeHtml(t.menuTitle) +
      "</strong><small>" +
      escapeHtml(t.menuLead) +
      "</small></div>" +
      menuItems +
      "</div>" +
      "</div>" +
      '<a href="/#contact" data-at8-link="contact">' +
      escapeHtml(t.navContact) +
      "</a>" +
      "</nav>" +
      '<button type="button" class="at8-toggle" data-at8-toggle aria-label="' +
      escapeHtml(t.openMenu) +
      '" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line></svg>' +
      "</button>" +
      '<div class="at8-lang" aria-label="Language switcher">' +
      langButtons +
      "</div>" +
      '<div class="at8-drawer" data-at8-drawer>' +
      '<nav class="at8-drawer-links" aria-label="Mobile navigation">' +
      '<a href="/" data-at8-link="home">' +
      escapeHtml(t.navHome) +
      "</a>" +
      '<a href="/#about" data-at8-link="about">' +
      escapeHtml(t.navAbout) +
      "</a>" +
      '<a href="/#projects" data-at8-link="projects">' +
      escapeHtml(t.navProjects) +
      "</a>" +
      '<a href="/#contact" data-at8-link="contact">' +
      escapeHtml(t.navContact) +
      "</a>" +
      "</nav>" +
      '<div class="at8-drawer-projects"><strong>' +
      escapeHtml(t.menuTitle) +
      "</strong>" +
      drawerProjects +
      "</div>" +
      '<div class="at8-drawer-lang">' +
      langButtons +
      "</div>" +
      "</div>" +
      "</header>"
    );
  }

  var FOOTER_COPY = {
    en: { tagline: "IT lead working across infrastructure, networks, and web/mail systems.", links: "Quick links", source: "Source" },
    fa: { tagline: "راهبر IT با تمرکز روی زیرساخت، شبکه و سیستم‌های وب و ایمیل.", links: "دسترسی سریع", source: "کد منبع" },
    ar: { tagline: "قائد تقني يعمل في البنية التحتية والشبكات وأنظمة الويب والبريد.", links: "روابط سريعة", source: "المصدر" },
    de: { tagline: "IT Lead mit Fokus auf Infrastruktur, Netzwerke und Web-/Mail-Systeme.", links: "Schnellzugriff", source: "Quelle" }
  };

  function buildFooterHtml(lang) {
    var t = NAV_COPY[lang] || NAV_COPY.en;
    var f = FOOTER_COPY[lang] || FOOTER_COPY.en;
    var projectLinks = PROJECTS.map(function (project) {
      return '<a href="' + project.path + '">' + escapeHtml(project.title) + "</a>";
    }).join("");

    return (
      '<footer class="at8-footer">' +
      "<div>" +
      "<strong>Milad Ateight</strong>" +
      "<div>" +
      escapeHtml(f.tagline) +
      "</div>" +
      "</div>" +
      '<nav class="at8-footer-links" aria-label="' +
      escapeHtml(f.links) +
      '">' +
      '<a href="/">' +
      escapeHtml(t.navHome) +
      "</a>" +
      '<a href="/#about">' +
      escapeHtml(t.navAbout) +
      "</a>" +
      '<a href="/#contact">' +
      escapeHtml(t.navContact) +
      "</a>" +
      projectLinks +
      "</nav>" +
      "</footer>"
    );
  }

  function markCurrentPage(root) {
    var path = window.location.pathname.replace(/\/index\.html$/, "/");
    root.querySelectorAll("[data-at8-link]").forEach(function (link) {
      var href = link.getAttribute("href");
      var isHome = href === "/" && (path === "/" || path === "/index.html");
      var isSelf = href.indexOf("/#") !== 0 && path.indexOf(href) === 0 && href !== "/";
      if (isHome || isSelf) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function wireInteractivity(root, onLanguageChange) {
    var toggle = root.querySelector("[data-at8-toggle]");
    var drawer = root.querySelector("[data-at8-drawer]");
    var menu = root.querySelector("[data-at8-menu]");

    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }

    if (toggle && drawer) {
      toggle.addEventListener("click", function () {
        var open = drawer.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    root.querySelectorAll("[data-at8-drawer] a, [data-at8-drawer] button[data-at8-lang-btn]").forEach(function (el) {
      el.addEventListener("click", function () {
        if (!el.hasAttribute("data-at8-lang-btn")) closeDrawer();
      });
    });

    if (menu) {
      var menuLink = menu.querySelector("a");
      menuLink.addEventListener("click", function (event) {
        if (window.matchMedia("(hover: hover)").matches) return;
        event.preventDefault();
        menu.classList.toggle("is-open");
      });
      document.addEventListener("click", function (event) {
        if (!menu.contains(event.target)) menu.classList.remove("is-open");
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeDrawer();
        if (menu) menu.classList.remove("is-open");
      }
    });

    root.querySelectorAll("[data-at8-lang-btn]").forEach(function (button) {
      button.addEventListener("click", function () {
        var lang = button.getAttribute("data-at8-lang-btn");
        saveLanguage(lang);
        applyLanguage(lang);
        if (onLanguageChange) onLanguageChange(lang);
      });
    });
  }

  function applyLanguage(lang) {
    var t = NAV_COPY[lang] || NAV_COPY.en;
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.body.classList.toggle("at8-rtl", t.dir === "rtl");

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var dict = window.AT8_PAGE_COPY && window.AT8_PAGE_COPY[lang];
      var key = node.getAttribute("data-i18n");
      if (dict && dict[key] != null) node.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (node) {
      var dict = window.AT8_PAGE_COPY && window.AT8_PAGE_COPY[lang];
      var key = node.getAttribute("data-i18n-html");
      if (dict && dict[key] != null) node.innerHTML = dict[key];
    });

    var header = document.getElementById("at8-header");
    if (header) {
      header.innerHTML = buildHeaderHtml(lang);
      markCurrentPage(header);
      wireInteractivity(header, applyLanguage);
    }

    var footer = document.getElementById("at8-footer");
    if (footer) footer.innerHTML = buildFooterHtml(lang);

    document.querySelectorAll("[data-at8-related]").forEach(function (node) {
      var exclude = node.getAttribute("data-at8-related");
      node.innerHTML = PROJECTS.filter(function (project) {
        return project.slug !== exclude;
      })
        .map(function (project) {
          return (
            '<a class="at8-related-card" href="' +
            project.path +
            '"><strong>' +
            escapeHtml(project.title) +
            "</strong><small>" +
            escapeHtml(project.type[lang] || project.type.en) +
            "</small></a>"
          );
        })
        .join("");
    });

    if (window.AT8_PAGE_TITLE && window.AT8_PAGE_TITLE[lang]) {
      document.title = window.AT8_PAGE_TITLE[lang];
    }
  }

  function initReveal() {
    var items = document.querySelectorAll("[data-at8-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initMagnetic() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.querySelectorAll("[data-at8-magnetic]").forEach(function (el) {
      var strength = parseFloat(el.getAttribute("data-at8-magnetic")) || 14;
      el.addEventListener("mousemove", function (event) {
        var rect = el.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
        var y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;
        el.style.transform = "translate(" + x + "px, " + y + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "translate(0, 0)";
      });
    });
  }

  function init() {
    var header = document.getElementById("at8-header");
    var lang = getSavedLanguage();
    if (header) {
      header.innerHTML = buildHeaderHtml(lang);
      markCurrentPage(header);
      wireInteractivity(header, applyLanguage);
    }
    applyLanguage(lang);
    initReveal();
    initMagnetic();
  }

  window.AT8 = {
    PROJECTS: PROJECTS,
    NAV_COPY: NAV_COPY,
    getLanguage: getSavedLanguage,
    setLanguage: function (lang) {
      saveLanguage(lang);
      applyLanguage(lang);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
