import { readFile, readdir, writeFile, cp } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const assetsDir = join(distDir, "assets");
const indexPath = join(distDir, "index.html");
const fallbackPath = join(distDir, "404.html");
const rootPreviewPath = fileURLToPath(new URL("../Milad-Portfolio.html", import.meta.url));

let html = await readFile(indexPath, "utf8");
const assets = await readdir(assetsDir);

const cssFile = assets.find((file) => file.endsWith(".css"));
const jsFile = assets.find((file) => file.endsWith(".js") && !file.includes("vendor") && !file.includes("motion") && !file.includes("icons"));

if (!cssFile || !jsFile) {
  throw new Error("Could not find the generated CSS or JS asset.");
}

const css = await readFile(join(assetsDir, cssFile), "utf8");
const js = await readFile(join(assetsDir, jsFile), "utf8");

try {
  const favicon = await readFile(join(distDir, "favicon.png"));
  const faviconData = `data:image/png;base64,${favicon.toString("base64")}`;
  html = html.replace(
    /<link rel="icon"[^>]+>/,
    `<link rel="icon" type="image/png" href="${faviconData}">`
  );
} catch {}

html = html.replace(/\s*<link rel="modulepreload"[^>]+>\n?/g, "");
html = html.replace(
  /\s*<link rel="stylesheet" crossorigin href="\.\/assets\/[^"]+">\n?/,
  () => `\n    <style>\n${css}\n    </style>\n`
);
html = html.replace(
  /\s*<script type="module" crossorigin src="\.\/assets\/[^"]+"><\/script>\n?/,
  () => `\n    <script type="module">\n${js}\n    </script>\n`
);

await writeFile(indexPath, html, "utf8");
await writeFile(fallbackPath, html, "utf8");
await writeFile(rootPreviewPath, html, "utf8");
console.log("Created standalone dist/index.html, dist/404.html, and Milad-Portfolio.html");
