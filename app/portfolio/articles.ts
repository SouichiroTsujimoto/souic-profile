export type ArticlePlatform = "zenn" | "qiita" | "note" | "blog";

export interface Article {
	platform: ArticlePlatform;
	url: string;
	title: string;
	emoji?: string;
	thumbnailUrl?: string;
	publishedAt: string;
	likes?: number;
	tags?: string[];
}

/**
 * 自動取得対象とするZennアカウント。
 * 配列に追加すれば複数アカウントの記事をマージできる。
 */
export const zennUsernames: string[] = ["wuhu1sland"];

/**
 * 手動で追加する記事（Zenn以外のプラットフォーム用）。
 * thumbnailUrl を省くと URL から OGP を自動取得する。
 */
export const manualArticles: Article[] = [
	{
		platform: "blog",
		url: "https://techblog.lycorp.co.jp/ja/20251015a",
		title: "セキュリティプラットフォームのインターン体験記（インターンレポート）",
		publishedAt: "2025-10-15",
	},
];
