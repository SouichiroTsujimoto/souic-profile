"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PortfolioKeyboardNavigation() {
	const router = useRouter();

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
