"use client";

import { PORTFOLIO_SECTION_ID } from "@/app/lib/homePortfolioNav";
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
		update();
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, [update]);

	const href = toPortfolio ? `#${PORTFOLIO_SECTION_ID}` : "#top";
	const label = toPortfolio ? "ポートフォリオへ" : "ページトップへ";

	return (
		<a href={href} aria-label={label} className={className}>
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
		</a>
	);
}
