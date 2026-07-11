import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const indexPath = join(distDir, "index.html");
const fallbackPath = join(distDir, "404.html");
const rootPreviewPath = fileURLToPath(new URL("../Old/generated/Milad-Portfolio.html", import.meta.url));

const html = await readFile(indexPath, "utf8");
const siteUrl = "https://ateight.xyz";
const keywords = "Ateight, Milad Ateight, AT8, Milad AT8, میلاد AT8, میلاد ۸۸, KeyFix, NetDoctor, Hybrid Web and Mail Infrastructure, Media Downloader Bot, AI Chat RTL Fixer";
const routes = [
  {
    path: "/about/",
    title: "About Milad Ateight | AT8",
    description: "Learn about Milad Ateight's work across IT operations, network infrastructure, Linux and Windows servers, web and mail systems, DevOps, cloud, and automation.",
  },
  {
    path: "/contact/",
    title: "Contact Milad Ateight | AT8",
    description: "Contact Milad Ateight through email, GitHub, or Telegram for infrastructure work, project review, automation, and technical collaboration.",
  },
  {
    path: "/KeyFix/",
    title: "KeyFix | Milad Ateight AT8 Project",
    description: "KeyFix detects wrong keyboard-layout typing, switches input language, and corrects the previous word locally without telemetry.",
  },
  {
    path: "/NetDoctor/",
    title: "NetDoctor | Milad Ateight AT8 Project",
    description: "NetDoctor is a Windows network diagnostic app for DNS, latency, proxy state, and connectivity issues with guided repair flows.",
  },
  {
    path: "/hybrid-web-mail-infrastructure/",
    title: "Hybrid Web and Mail Infrastructure | Milad Ateight AT8 Project",
    description: "A sanitized production case study covering Linux hosting, web and mail infrastructure, HAProxy, WireGuard, MikroTik, DNS, TLS, and backups.",
  },
  {
    path: "/instagram-youtube-soundcloud-downloader/",
    title: "Media Downloader Bot | Milad Ateight AT8 Project",
    description: "A private Telegram bot that downloads from Instagram, YouTube, and SoundCloud with admin activation and cookie management.",
  },
  {
    path: "/AI-Chat-RTL-Fixer/",
    title: "AI Chat RTL Fixer | Milad Ateight AT8 Project",
    description: "A free, open-source Windows tray tool that fixes right-to-left rendering inside AI desktop chat apps for Persian, Arabic, Hebrew, and Urdu, while code and English stay left-to-right.",
  },
];

const sitemapPaths = ["/", ...routes.map((route) => route.path)];
const profileSourcePath = fileURLToPath(new URL("../src/data/profile.js", import.meta.url));
const profileSource = await readFile(profileSourcePath, "utf8");
const projectRoutePaths = [...profileSource.matchAll(/\w+Page:\s*"([^"]+)"/g)].map((match) => match[1]);
const appRoutePaths = ["/about/", "/contact/", ...projectRoutePaths];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function createSitemap() {
  const generatedRoutes = [...routes.map((route) => route.path)].sort();
  const applicationRoutes = [...appRoutePaths].sort();
  if (JSON.stringify(generatedRoutes) !== JSON.stringify(applicationRoutes)) {
    throw new Error("SEO route metadata is out of sync with the application routes");
  }
  const uniquePaths = new Set(sitemapPaths);
  if (uniquePaths.size !== sitemapPaths.length) throw new Error("Sitemap contains duplicate routes");
  sitemapPaths.forEach((path) => {
    if (!path.startsWith("/") || (path !== "/" && !path.endsWith("/"))) {
      throw new Error(`Sitemap route must be an absolute trailing-slash path: ${path}`);
    }
  });

  const entries = sitemapPaths
    .map((path) => `  <url>\n    <loc>${escapeXml(`${siteUrl}${path}`)}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function routeHtml(route) {
  const canonical = `${siteUrl}${route.path}`;
  const alternates = ["en", "fa", "ar", "de"]
    .map((lang) => `    <link rel="alternate" hreflang="${lang}" href="${canonical}?lang=${lang}" />`)
    .join("\n");
  return html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta name="keywords" content="[^"]*" \/>/, `<meta name="keywords" content="${escapeHtml(keywords)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/    <link rel="alternate" hreflang="en" href="[^"]*" \/>\n    <link rel="alternate" hreflang="fa" href="[^"]*" \/>\n    <link rel="alternate" hreflang="ar" href="[^"]*" \/>\n    <link rel="alternate" hreflang="de" href="[^"]*" \/>\n    <link rel="alternate" hreflang="x-default" href="[^"]*" \/>/, `${alternates}\n    <link rel="alternate" hreflang="x-default" href="${canonical}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`);
}

await writeFile(fallbackPath, html, "utf8");
await mkdir(dirname(rootPreviewPath), { recursive: true });
await writeFile(rootPreviewPath, html, "utf8");
for (const route of routes) {
  const routeDir = join(distDir, route.path.replace(/^\/|\/$/g, ""));
  await mkdir(routeDir, { recursive: true });
  await writeFile(join(routeDir, "index.html"), routeHtml(route), "utf8");
}

await writeFile(join(distDir, "sitemap.xml"), createSitemap(), "utf8");
await writeFile(
  join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  "utf8"
);

console.log(`Created dist/404.html, ${routes.length} route index files, sitemap.xml, robots.txt, and Old/generated/Milad-Portfolio.html`);
