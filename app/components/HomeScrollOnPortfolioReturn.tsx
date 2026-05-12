"use client";

import {
	OPEN_PORTFOLIO_QUERY_KEY,
	OPEN_PORTFOLIO_QUERY_VALUE,
	PORTFOLIO_SECTION_ID,
} from "@/app/lib/homePortfolioNav";
import {
	clearPendingHomeScrollRestore,
	consumeHomeScrollRestore,
} from "@/app/lib/homeScrollSession";
import { userScrollBehavior } from "@/app/lib/scrollBehaviorPreference";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

/**
 * - `?openPortfolio=1`: 旧 `/portfolio` リダイレクト時に About へスクロール（保存していた戻り用スクロールは破棄）
 * - それ以外でトップへ戻った直後: sessionStorage にあればスクロール位置を復元
 */
export default function HomeScrollOnPortfolioReturn() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (pathname !== "/") return;
		if (
			searchParams.get(OPEN_PORTFOLIO_QUERY_KEY) !==
			OPEN_PORTFOLIO_QUERY_VALUE
		)
			return;

		clearPendingHomeScrollRestore();

		const el = document.getElementById(PORTFOLIO_SECTION_ID);
		requestAnimationFrame(() => {
			el?.scrollIntoView({
				behavior: userScrollBehavior(),
				block: "start",
			});
		});

		const t = window.setTimeout(() => {
			router.replace("/", { scroll: false });
		}, 350);

		return () => {
			window.clearTimeout(t);
		};
	}, [pathname, router, searchParams]);

	useLayoutEffect(() => {
		if (pathname !== "/") return;
		if (
			searchParams.get(OPEN_PORTFOLIO_QUERY_KEY) ===
			OPEN_PORTFOLIO_QUERY_VALUE
		)
			return;

		const y = consumeHomeScrollRestore();
		if (y == null) return;

		window.scrollTo({ top: y, left: 0, behavior: "instant" });
	}, [pathname, searchParams]);

	return null;
}
