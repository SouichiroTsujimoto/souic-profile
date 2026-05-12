"use client";

import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import { navigateHomeFromPortfolioOverlay } from "@/app/lib/homePortfolioNav";
import { userScrollBehavior } from "@/app/lib/scrollBehaviorPreference";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PortfolioKeyboardNavigation() {
	const router = useTransitionRouter();
	const pathname = usePathname();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== "Escape") return;
			if (pathname === "/") {
				window.scrollTo({ top: 0, behavior: userScrollBehavior() });
			} else {
				navigateHomeFromPortfolioOverlay(router);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [router, pathname]);

	return null;
}
