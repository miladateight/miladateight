import { readFile, writeFile, cp } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const indexPath = join(distDir, "index.html");
const fallbackPath = join(distDir, "404.html");
const rootPreviewPath = fileURLToPath(new URL("../Milad-Portfolio.html", import.meta.url));

const html = await readFile(indexPath, "utf8");

await writeFile(fallbackPath, html, "utf8");
await writeFile(rootPreviewPath, html, "utf8");
console.log("Created dist/404.html (SPA fallback) and Milad-Portfolio.html");
