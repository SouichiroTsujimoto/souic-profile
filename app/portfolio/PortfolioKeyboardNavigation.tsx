"use client";

import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import { useEffect } from "react";

export default function PortfolioKeyboardNavigation() {
	const router = useTransitionRouter();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				router.push("/");
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [router]);

	return null;
}
