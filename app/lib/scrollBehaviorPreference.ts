/**
 * タッチ主体の端末や視差オフでは、アニメーション付きスクロールを避ける。
 * iOS / Android の hash ジャンプ・scrollIntoView の取りこぼしや二重発火を減らす目的。
 */
export function prefersImmediateScroll(): boolean {
	if (typeof window === "undefined") return false;
	return (
		window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
		window.matchMedia("(pointer: coarse)").matches
	);
}

export function userScrollBehavior(): ScrollBehavior {
	return prefersImmediateScroll() ? "auto" : "smooth";
}
