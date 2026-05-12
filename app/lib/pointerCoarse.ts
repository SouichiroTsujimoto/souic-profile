/** タッチ主体の端末（スマホ・一部タブレット） */
export function isPointerCoarse(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(pointer: coarse)").matches;
}
