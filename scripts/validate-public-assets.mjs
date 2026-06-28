import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

const sources = [
	"app/portfolio/projects.ts",
	"app/lib/siteProfile.ts",
	"app/components/HomeCard.tsx",
	"app/home.module.css",
	"app/portfolio/profile/ProfileContent.tsx",
];

const quotedAssetRe =
	/["'](\/(?!\/)[^"']+\.(?:webp|png|jpg|jpeg|svg|ico))["']/g;
const cssUrlRe =
	/url\(["']?(\/[^"')]+\.(?:webp|png|jpg|jpeg|svg|ico))["']?\)/g;

const paths = new Set();

for (const source of sources) {
	const text = readFileSync(join(root, source), "utf8");
	for (const match of text.matchAll(quotedAssetRe)) {
		paths.add(match[1]);
	}
	for (const match of text.matchAll(cssUrlRe)) {
		paths.add(match[1]);
	}
}

const missing = [...paths]
	.filter((assetPath) => !existsSync(join(publicDir, assetPath.slice(1))))
	.sort();

if (missing.length > 0) {
	console.error("Missing public assets:");
	for (const assetPath of missing) {
		console.error(`  ${assetPath}`);
	}
	process.exit(1);
}

console.log(`Validated ${paths.size} public asset references.`);
