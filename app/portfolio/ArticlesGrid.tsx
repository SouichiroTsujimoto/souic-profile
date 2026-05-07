import Image from "next/image";
import type { Article, ArticlePlatform } from "./articles";
import { getArticles } from "./lib/fetchArticles";
import styles from "./portfolio.module.css";

const PLATFORM_LABEL: Record<ArticlePlatform, string> = {
	zenn: "Zenn",
	qiita: "Qiita",
	note: "note",
	blog: "Blog",
};

const formatDate = (iso: string): string => {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
};

function ArticleCard({ article }: { article: Article }) {
	const hasThumb = Boolean(article.thumbnailUrl);
	return (
		<a
			href={article.url}
			target="_blank"
			rel="noreferrer"
			className={`${styles.projectCard} ${styles.articleCard}`}
		>
			<div className={styles.articleMedia}>
				{hasThumb ? (
					<Image
						src={article.thumbnailUrl as string}
						alt={article.title}
						width={1200}
						height={630}
						sizes="(min-width: 768px) 50vw, 100vw"
						className={styles.articleThumb}
						unoptimized
					/>
				) : (
					<div className={styles.articleEmojiBox}>
						<span
							className={styles.articleEmoji}
							aria-hidden="true"
						>
							{article.emoji ?? "📝"}
						</span>
					</div>
				)}
			</div>
			<div className={styles.articleBody}>
				<h3 className={`${styles.projectTitle} ${styles.articleTitle}`}>
					{article.title}
				</h3>
				<p className={`text-xs ${styles.projectMeta}`}>
					{formatDate(article.publishedAt)}
				</p>
				<div className="flex flex-wrap gap-1 mt-auto pt-1">
					<span className={styles.projectChip}>
						{PLATFORM_LABEL[article.platform]}
					</span>
					{typeof article.likes === "number" && article.likes > 0 ? (
						<span className={styles.projectChip}>
							♥ {article.likes}
						</span>
					) : null}
				</div>
			</div>
		</a>
	);
}

export default async function ArticlesGrid() {
	const articles = await getArticles();

	if (articles.length === 0) return null;

	return (
		<section className="mt-12">
			<h2
				className={`text-3xl font-bold text-center mb-8 ${styles.sectionHeading}`}
			>
				Articles
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{articles.map((article) => (
					<ArticleCard key={article.url} article={article} />
				))}
			</div>
		</section>
	);
}
