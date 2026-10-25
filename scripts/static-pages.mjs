import { readFile, writeFile, mkdir } from "node:fs/promises";

const routes = JSON.parse(await readFile(new URL("../src/shell/route-data.json", import.meta.url), "utf8"));
const dist = new URL("../dist/", import.meta.url);
const template = await readFile(new URL("index.html", dist), "utf8");

// Actual index documents keep refreshed deep links working on both static hosts.
for (const route of routes) {
  if (route.path === "/") continue;
  if (!/^\/[a-z0-9/-]+$/.test(route.path)) throw new Error(`Invalid route: ${route.path}`);
  const directory = new URL(`${route.path.slice(1)}/`, dist);
  await mkdir(directory, { recursive: true });
  const title = route.documentTitle.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
  await writeFile(new URL("index.html", directory), template.replace(/<title>.*?<\/title>/, `<title>${title}</title>`));
}
await writeFile(new URL("404.html", dist), template);
await writeFile(new URL(".nojekyll", dist), "");
console.log(`Generated ${routes.length} route entry points and a 404 page.`);
