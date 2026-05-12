const SCROLL_Y_KEY = "homePortfolioLandingScrollY";
const PENDING_KEY = "homePortfolioLandingScrollRestorePending";

export function saveHomeScrollForPortfolioReturn(): void {
	if (typeof window === "undefined") return;
	sessionStorage.setItem(SCROLL_Y_KEY, String(window.scrollY));
	sessionStorage.setItem(PENDING_KEY, "1");
}

export function clearPendingHomeScrollRestore(): void {
	if (typeof window === "undefined") return;
	sessionStorage.removeItem(PENDING_KEY);
	sessionStorage.removeItem(SCROLL_Y_KEY);
}

/** 保存済みなら値を返し、ストレージは消す（未保存なら null） */
export function consumeHomeScrollRestore(): number | null {
	if (typeof window === "undefined") return null;
	const pending = sessionStorage.getItem(PENDING_KEY);
	const y = sessionStorage.getItem(SCROLL_Y_KEY);
	sessionStorage.removeItem(PENDING_KEY);
	sessionStorage.removeItem(SCROLL_Y_KEY);
	if (pending !== "1" || y == null) return null;
	const parsed = Number.parseInt(y, 10);
	return Number.isFinite(parsed) ? parsed : null;
}
