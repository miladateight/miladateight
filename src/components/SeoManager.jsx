import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { projects } from "../data/projects";
import { projectPages } from "../data/projectPages";
import { profile } from "../data/profile";
import { localize } from "../utils/localize";

const siteUrl = "https://ateight.xyz";
const ogImage = `${siteUrl}/brand/at8-logo-og.png`;
const supportedLanguages = ["en", "fa", "ar", "de"];
const brandKeywords = [
  "Ateight",
  "Milad Ateight",
  "AT8",
  "Milad AT8",
  "Milad Fatemi",
  "Milad Fatemi Ateight",
  "میلاد Ateight",
  "میلاد AT8",
  "میلاد 88",
  "میلاد ۸۸",
  "میلاد فاطمی",
  "میلاد فاطمی Ateight",
  "KeyFix",
  "NetDoctor",
  "PDF Sanitizer",
  "Hybrid Web and Mail Infrastructure",
  "Media Downloader Bot",
  "AI Chat RTL Fixer",
  "VEYNA",
  "Veyna.App",
];

const pageCopy = {
  home: {
    title: {
      en: "Milad Ateight | AT8 - Developer, Web Designer & Network/DevOps Engineer",
      fa: "Milad Ateight | AT8 - برنامه‌نویس، طراح وب و متخصص شبکه و DevOps",
      ar: "Milad Ateight | AT8 - مطوّر ومصمم مواقع ومتخصص شبكات وDevOps",
      de: "Milad Ateight | AT8 - Entwickler, Webdesigner und Netzwerk-/DevOps-Experte",
    },
    description: {
      en: "Milad Ateight, also known as Milad Fatemi, is a developer and web designer who also works across network infrastructure, server administration, DevOps, cloud, and web and mail systems.",
      fa: "Milad Ateight (میلاد فاطمی، میلاد ۸۸) برنامه‌نویس و طراح وب است و در کنار آن روی شبکه، زیرساخت سرور، DevOps، ابر و سیستم‌های وب و ایمیل هم کار می‌کند.",
      ar: "Milad Ateight مطوّر ومصمم مواقع، ويعمل أيضًا في البنية التحتية للشبكات وإدارة الخوادم وDevOps والسحابة وأنظمة الويب والبريد.",
      de: "Milad Ateight (Milad Fatemi) ist Entwickler und Webdesigner und arbeitet zudem an Netzwerkinfrastruktur, Serveradministration, DevOps, Cloud sowie Web- und Mail-Systemen.",
    },
  },
  about: {
    title: {
      en: "About Milad Ateight (Milad Fatemi) | Ateight AT8",
      fa: "درباره Milad Ateight (میلاد فاطمی) | Ateight AT8",
      ar: "عن Milad Ateight | AT8",
      de: "Über Milad Ateight | AT8",
    },
    description: {
      en: "Learn about Milad Ateight, also known as Milad Fatemi, and his work across IT operations, network infrastructure, Linux and Windows servers, web and mail systems, DevOps, cloud, and automation.",
      fa: "با کار Milad Ateight، معروف به میلاد فاطمی و میلاد ۸۸، در عملیات IT، زیرساخت شبکه، سرورهای لینوکس و ویندوز، سیستم‌های وب و ایمیل، DevOps، ابر و اتوماسیون آشنا شوید.",
      ar: "تعرف على عمل Milad Ateight في عمليات تقنية المعلومات وبنية الشبكات وخوادم Linux وWindows وأنظمة الويب والبريد وDevOps والسحابة والأتمتة.",
      de: "Erfahre mehr über Milad Ateights Arbeit in IT-Betrieb, Netzwerkinfrastruktur, Linux- und Windows-Servern, Web- und Mail-Systemen, DevOps, Cloud und Automatisierung.",
    },
  },
  contact: {
    title: {
      en: "Contact Milad Ateight (Milad Fatemi) | Ateight AT8",
      fa: "تماس با Milad Ateight (میلاد فاطمی) | Ateight AT8",
      ar: "تواصل مع Milad Ateight | AT8",
      de: "Kontakt zu Milad Ateight | AT8",
    },
    description: {
      en: "Contact Milad Ateight, also known as Milad Fatemi, through email, GitHub, or Telegram for infrastructure work, project review, automation, and technical collaboration.",
      fa: "برای کارهای زیرساختی، بررسی پروژه، اتوماسیون و همکاری فنی از طریق ایمیل، GitHub یا Telegram با Milad Ateight، میلاد فاطمی، تماس بگیرید.",
      ar: "تواصل مع Milad Ateight عبر البريد الإلكتروني أو GitHub أو Telegram لأعمال البنية التحتية ومراجعة المشاريع والأتمتة والتعاون التقني.",
      de: "Kontaktiere Milad Ateight per E-Mail, GitHub oder Telegram für Infrastrukturarbeit, Projekt-Reviews, Automatisierung und technische Zusammenarbeit.",
    },
  },
  notFound: {
    title: {
      en: "Page Not Found | AT8",
      fa: "صفحه پیدا نشد | AT8",
      ar: "الصفحة غير موجودة | AT8",
      de: "Seite nicht gefunden | AT8",
    },
    description: {
      en: "The requested AT8 portfolio page could not be found.",
      fa: "صفحه درخواستی در پورتفولیوی AT8 پیدا نشد.",
      ar: "تعذر العثور على صفحة AT8 المطلوبة.",
      de: "Die angeforderte AT8 Portfolio-Seite wurde nicht gefunden.",
    },
  },
};

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function upsertMeta(selector, attrs) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    document.head.appendChild(node);
  }
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
}

function upsertCanonical(href) {
  let node = document.head.querySelector('link[rel="canonical"]');
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", "canonical");
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
}

function upsertAlternateLinks(canonical) {
  document.head.querySelectorAll('link[data-at8-hreflang="true"]').forEach((node) => node.remove());
  supportedLanguages.forEach((lang) => {
    const node = document.createElement("link");
    node.setAttribute("rel", "alternate");
    node.setAttribute("hreflang", lang);
    node.setAttribute("href", `${canonical}?lang=${lang}`);
    node.dataset.at8Hreflang = "true";
    document.head.appendChild(node);
  });
  const fallback = document.createElement("link");
  fallback.setAttribute("rel", "alternate");
  fallback.setAttribute("hreflang", "x-default");
  fallback.setAttribute("href", canonical);
  fallback.dataset.at8Hreflang = "true";
  document.head.appendChild(fallback);
}

function setRouteJsonLd(items) {
  document.head.querySelectorAll('script[data-at8-route-jsonld="true"]').forEach((node) => node.remove());
  items.forEach((item) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.at8RouteJsonld = "true";
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
}

function getProject(pathname) {
  const normalized = normalizePath(pathname);
  return projects.find((project) => normalizePath(project.pageUrl) === normalized);
}

function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.aliases,
    additionalName: profile.legalName,
    url: profile.website,
    email: profile.email,
    jobTitle: "Developer & Web Designer / IT Specialist",
    sameAs: [profile.github, profile.telegram],
    knowsAbout: [
      "Programming",
      "Web design",
      "Web development",
      "IT operations",
      "Network infrastructure",
      "MikroTik",
      "Linux server administration",
      "Windows Server",
      "DevOps",
      "Cloud",
      "Mail systems",
      "Automation",
    ],
  };
}

function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ateight",
    alternateName: ["AT8 Portfolio", "Milad AT8", "Milad Ateight", "Milad Fatemi", "میلاد 88", "میلاد ۸۸", "میلاد فاطمی"],
    url: siteUrl,
    author: { "@type": "Person", name: profile.name, alternateName: profile.aliases },
    inLanguage: supportedLanguages,
  };
}

export default function SeoManager({ language }) {
  const location = useLocation();

  const seo = useMemo(() => {
    const normalized = normalizePath(location.pathname);
    const project = getProject(normalized);
    const is404 = !project && !["/", "/about/", "/contact/"].includes(normalized);
    const canonical = `${siteUrl}${normalized}`;

    if (project) {
      const projectPage = projectPages[project.slug];
      const lead = projectPage?.lead ? localize(projectPage.lead, language) : "";
      const stackItems = Array.isArray(project.stack) ? project.stack : String(project.stack || "").split(",").map((item) => item.trim()).filter(Boolean);
      const stackText = stackItems.join(", ");
      const title = `${project.title} | ${localize(project.type, language)} | Milad Ateight AT8`;
      const description = lead || `${localize(project.lines, language)} Built and documented by Milad Ateight across ${stackText}.`;
      const keywords = [...brandKeywords, project.title, localize(project.type, language), stackText].filter(Boolean).join(", ");
      return {
        title,
        description,
        canonical,
        keywords,
        robots: "index,follow",
        jsonLd: [
          breadcrumbJsonLd([
            { name: "Home", url: siteUrl },
            { name: "Projects", url: `${siteUrl}/#projects` },
            { name: project.title, url: canonical },
          ]),
          {
            "@context": "https://schema.org",
            "@type": project.slug === "hybrid-web-mail-infrastructure" ? "CreativeWork" : "SoftwareApplication",
            name: project.title,
            url: canonical,
            description,
            applicationCategory: localize(project.type, language),
            programmingLanguage: stackItems,
            keywords,
            inLanguage: language,
            mainEntityOfPage: canonical,
            author: { "@type": "Person", name: profile.name, url: profile.website },
            ...(project.url ? { codeRepository: project.url } : {}),
          },
        ],
      };
    }

    const key = normalized === "/about/" ? "about" : normalized === "/contact/" ? "contact" : is404 ? "notFound" : "home";
    return {
      title: localize(pageCopy[key].title, language),
      description: localize(pageCopy[key].description, language),
      canonical: is404 ? `${siteUrl}${normalized}` : canonical,
      keywords: brandKeywords.join(", "),
      robots: is404 ? "noindex,follow" : "index,follow",
      jsonLd: [
        key === "home" ? personJsonLd() : null,
        key === "home" ? websiteJsonLd() : null,
        key === "about"
          ? {
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              name: localize(pageCopy.about.title, language),
              url: canonical,
              mainEntity: personJsonLd(),
            }
          : null,
        key !== "home"
          ? breadcrumbJsonLd([
              { name: "Home", url: siteUrl },
              { name: key === "about" ? "About" : key === "contact" ? "Contact" : "404", url: canonical },
            ])
          : null,
      ].filter(Boolean),
    };
  }, [language, location.pathname]);

  useEffect(() => {
    document.title = seo.title;
    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: seo.keywords });
    upsertMeta('meta[name="robots"]', { name: "robots", content: seo.robots });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: seo.canonical });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: `${seo.title}` });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Ateight" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: language === "fa" ? "fa_IR" : language === "ar" ? "ar" : language === "de" ? "de_DE" : "en_US" });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage });
    upsertCanonical(seo.canonical);
    upsertAlternateLinks(seo.canonical);
    setRouteJsonLd(seo.jsonLd);
  }, [seo]);

  return null;
}
