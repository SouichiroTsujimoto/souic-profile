"use client";

import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import { useEffect } from "react";

export default function KeyboardNavigation() {
	const router = useTransitionRouter();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				router.push("/portfolio");
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [router]);

	return null;
}
