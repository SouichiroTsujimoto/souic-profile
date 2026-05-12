"use client";

import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import { navigateHomeFromPortfolioOverlay } from "@/app/lib/homePortfolioNav";
import { useEffect } from "react";

export default function KeyboardNavigation() {
	const router = useTransitionRouter();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				navigateHomeFromPortfolioOverlay(router);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [router]);

	return null;
}
