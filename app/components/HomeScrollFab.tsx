"use client";

import { PORTFOLIO_SECTION_ID } from "@/app/lib/homePortfolioNav";
import { userScrollBehavior } from "@/app/lib/scrollBehaviorPreference";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";

/**
 * ヒーロー（カード）中心のときは下＝About（ポートフォリオ）へ、
 * About エリアに入ったあとは上＝ページトップへ。
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
		let raf = 0;
		const scheduleUpdate = () => {
			if (raf) return;
			raf = requestAnimationFrame(() => {
				raf = 0;
				update();
			});
		};

		update();
		window.addEventListener("scroll", scheduleUpdate, { passive: true });

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
		vv?.addEventListener("scroll", scheduleUpdate);

		return () => {
			if (raf) cancelAnimationFrame(raf);
			if (resizeTimer) clearTimeout(resizeTimer);
			window.removeEventListener("scroll", scheduleUpdate);
			window.removeEventListener("resize", onResize);
			vv?.removeEventListener("resize", onResize);
			vv?.removeEventListener("scroll", scheduleUpdate);
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
