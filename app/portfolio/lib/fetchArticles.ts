import "server-only";

import { type Article, manualArticles, zennUsernames } from "../articles";

const REVALIDATE_SECONDS = 60 * 60;
const FETCH_TIMEOUT_MS = 5_000;

interface ZennArticle {
	id: number;
	slug: string;
	title: string;
	emoji?: string;
	path: string;
	published_at: string;
	liked_count: number;
	article_type: string;
}

interface ZennApiResponse {
	articles: ZennArticle[];
	next_page: number | null;
}

const fetchWithTimeout = (url: string, ua: string) => {
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
	return fetch(url, {
		headers: { "User-Agent": ua },
		next: { revalidate: REVALIDATE_SECONDS },
		signal: ctrl.signal,
	}).finally(() => clearTimeout(timer));
};

const fetchZennArticles = async (username: string): Promise<ZennArticle[]> => {
	const url = `https://zenn.dev/api/articles?username=${encodeURIComponent(
		username,
	)}&order=latest`;
	try {
		const res = await fetchWithTimeout(url, "souic-profile/1.0");
		if (!res.ok) return [];
		const data = (await res.json()) as ZennApiResponse;
		return data.articles ?? [];
	} catch {
		return [];
	}
};

/** 属性順序に依存しない <meta> 抽出。og:image / twitter:image を優先して探す。 */
const META_TAG_RE = /<meta\b[^>]*>/gi;
const OG_PROP_RE =
	/(?:property|name)\s*=\s*["'](og:image(?::secure_url)?|twitter:image(?::src)?)["']/i;
const CONTENT_RE = /content\s*=\s*["']([^"']+)["']/i;

const extractOgImage = (html: string): string | undefined => {
	let best: { priority: number; url: string } | undefined;
	const tags = html.match(META_TAG_RE);
	if (!tags) return undefined;
	for (const tag of tags) {
		const propMatch = tag.match(OG_PROP_RE);
		if (!propMatch) continue;
		const contentMatch = tag.match(CONTENT_RE);
		if (!contentMatch) continue;
		const prop = propMatch[1].toLowerCase();
		const priority =
			prop === "og:image:secure_url"
				? 4
				: prop === "og:image"
					? 3
					: prop === "twitter:image"
						? 2
						: 1;
		if (!best || priority > best.priority) {
			best = { priority, url: contentMatch[1] };
		}
		if (priority === 4) break;
	}
	return best?.url;
};

const fetchOgImage = async (url: string): Promise<string | undefined> => {
	try {
		const res = await fetchWithTimeout(
			url,
			"souic-profile/1.0 (+ogp-fetch)",
		);
		if (!res.ok) return undefined;
		const html = await res.text();
		const raw = extractOgImage(html);
		if (!raw) return undefined;
		try {
			return new URL(raw, url).toString();
		} catch {
			return raw;
		}
	} catch {
		return undefined;
	}
};

const toArticle = async (entry: ZennArticle): Promise<Article> => {
	const url = `https://zenn.dev${entry.path}`;
	const thumbnailUrl = await fetchOgImage(url);
	return {
		platform: "zenn",
		url,
		title: entry.title,
		emoji: entry.emoji,
		thumbnailUrl,
		publishedAt: entry.published_at,
		likes: entry.liked_count,
	};
};

const enrichManual = async (article: Article): Promise<Article> => {
	if (article.thumbnailUrl) return article;
	const thumbnailUrl = await fetchOgImage(article.url);
	return thumbnailUrl ? { ...article, thumbnailUrl } : article;
};

/**
 * Zennと手動エントリをマージし、新しい順で返す。
 * Next.jsのfetchキャッシュを活用してISR (1h) で再生成。
 */
export const getArticles = async (): Promise<Article[]> => {
	const [zennLists, enrichedManual] = await Promise.all([
		Promise.all(zennUsernames.map(fetchZennArticles)),
		Promise.all(manualArticles.map(enrichManual)),
	]);
	const zennArticles = await Promise.all(zennLists.flat().map(toArticle));
	const merged = [...zennArticles, ...enrichedManual];
	merged.sort(
		(a, b) =>
			new Date(b.publishedAt).getTime() -
			new Date(a.publishedAt).getTime(),
	);
	return merged;
};
