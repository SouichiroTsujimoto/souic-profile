"use client";

import { PORTFOLIO_SECTION_ID } from "@/app/lib/homePortfolioNav";
import { isPointerCoarse } from "@/app/lib/pointerCoarse";
import { userScrollBehavior } from "@/app/lib/scrollBehaviorPreference";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";

const SCROLL_DEBOUNCE_MS_FINE = 160;
/** タッチでは慣性中の scroll が多いので長めにし、getBoundingClientRect の回数を抑える */
const SCROLL_DEBOUNCE_MS_COARSE = 480;

/**
 * ヒーロー（カード）中心のときは下＝About（ポートフォリオ）へ、
 * About エリアに入ったあとは上＝ページトップへ。
 *
 * スクロール中に高頻度で getBoundingClientRect するとレイアウト強制で
 * メインスレッドが詰まりやすい。scrollend で即更新し、scroll はデバウンス。
 * タッチ端末ではデバウンスを長くし、visualViewport の scroll は購読しない。
 */
export default function HomeScrollFab({ className }: { className: string }) {
	const [toPortfolio, setToPortfolio] = useState(true);

	const update = useCallback(() => {
		const about = document.getElementById(PORTFOLIO_SECTION_ID);
		if (!about) return;
		const top = about.getBoundingClientRect().top;
		const next = top > 80;
		setToPortfolio((prev) => (prev === next ? prev : next));
	}, []);

	useEffect(() => {
		const coarse = isPointerCoarse();
		const debounceMs = coarse
			? SCROLL_DEBOUNCE_MS_COARSE
			: SCROLL_DEBOUNCE_MS_FINE;

		let debounceTimer: ReturnType<typeof setTimeout> | null = null;

		const flushAfterScroll = () => {
			if (debounceTimer) {
				clearTimeout(debounceTimer);
				debounceTimer = null;
			}
			update();
		};

		const scheduleDebounced = () => {
			if (debounceTimer) clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				debounceTimer = null;
				update();
			}, debounceMs);
		};

		update();

		window.addEventListener("scrollend", flushAfterScroll, {
			passive: true,
		});
		document.addEventListener("scrollend", flushAfterScroll, {
			passive: true,
		});
		window.addEventListener("scroll", scheduleDebounced, { passive: true });

		let resizeTimer: ReturnType<typeof setTimeout> | null = null;
		const onResize = () => {
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				resizeTimer = null;
				update();
			}, 200);
		};
		window.addEventListener("resize", onResize);

		const vv = window.visualViewport;
		vv?.addEventListener("resize", onResize);
		if (!coarse) {
			vv?.addEventListener("scroll", scheduleDebounced);
		}

		return () => {
			if (debounceTimer) clearTimeout(debounceTimer);
			if (resizeTimer) clearTimeout(resizeTimer);
			window.removeEventListener("scrollend", flushAfterScroll);
			document.removeEventListener("scrollend", flushAfterScroll);
			window.removeEventListener("scroll", scheduleDebounced);
			window.removeEventListener("resize", onResize);
			vv?.removeEventListener("resize", onResize);
			vv?.removeEventListener("scroll", scheduleDebounced);
		};
	}, [update]);

	const behavior = userScrollBehavior();

	const handleClick = () => {
		if (toPortfolio) {
			document
				.getElementById(PORTFOLIO_SECTION_ID)
				?.scrollIntoView({ behavior, block: "start" });
		} else {
			window.scrollTo({ top: 0, left: 0, behavior });
		}
	};

	const label = toPortfolio ? "ポートフォリオへ" : "ページトップへ";

	return (
		<button
			type="button"
			className={className}
			aria-label={label}
			onClick={handleClick}
		>
			{toPortfolio ? (
				<ChevronDownIcon
					className="w-6 h-6 shrink-0"
					strokeWidth={2}
					aria-hidden
				/>
			) : (
				<ChevronUpIcon
					className="w-6 h-6 shrink-0"
					strokeWidth={2}
					aria-hidden
				/>
			)}
		</button>
	);
}
