"use client";

import { saveHomeScrollForPortfolioReturn } from "@/app/lib/homeScrollSession";
import { useEffect } from "react";

function isPortfolioChildLink(el: Element | null): el is HTMLAnchorElement {
	return (
		el instanceof HTMLAnchorElement &&
		el.getAttribute("href")?.startsWith("/portfolio/") === true
	);
}

/**
 * トップ（/）から /portfolio/... へ行く直前にスクロール位置を sessionStorage に残す。
 */
export default function SaveHomeScrollBeforePortfolioNav() {
	useEffect(() => {
		const onPointerDown = (e: PointerEvent) => {
			if (e.pointerType === "mouse" && e.button !== 0) return;
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
			if (window.location.pathname !== "/") return;

			const el = e.target;
			if (!(el instanceof Element)) return;
			const anchor = el.closest("a[href^='/portfolio/']");
			if (!isPortfolioChildLink(anchor)) return;
			if (anchor.target === "_blank") return;

			saveHomeScrollForPortfolioReturn();
		};

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key !== "Enter" && e.key !== " ") return;
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
			if (window.location.pathname !== "/") return;

			const t = e.target;
			if (!(t instanceof Element)) return;
			const anchor = t.closest("a[href^='/portfolio/']");
			if (!isPortfolioChildLink(anchor)) return;
			if (anchor.target === "_blank") return;

			saveHomeScrollForPortfolioReturn();
		};

		document.addEventListener("pointerdown", onPointerDown, true);
		document.addEventListener("keydown", onKeyDown, true);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown, true);
			document.removeEventListener("keydown", onKeyDown, true);
		};
	}, []);

	return null;
}
