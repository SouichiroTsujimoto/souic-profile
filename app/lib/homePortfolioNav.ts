/** トップ統合ページ内のポートフォリオ（About）セクション */
export const PORTFOLIO_SECTION_ID = "about";

export const OPEN_PORTFOLIO_QUERY_KEY = "openPortfolio";
export const OPEN_PORTFOLIO_QUERY_VALUE = "1";

/** 旧 `/portfolio` からのリダイレクト用（About へスクロール。戻るボタンには使わない） */
export function homePortfolioListHref(): string {
	return `/?${OPEN_PORTFOLIO_QUERY_KEY}=${OPEN_PORTFOLIO_QUERY_VALUE}`;
}

type RouterLike = {
	push: (href: string, options?: { scroll?: boolean }) => void;
};

/** profile / career / 作品 などオーバーレイからトップへ（スクロール位置は sessionStorage で復元） */
export function navigateHomeFromPortfolioOverlay(router: RouterLike): void {
	router.push("/", { scroll: false });
}
