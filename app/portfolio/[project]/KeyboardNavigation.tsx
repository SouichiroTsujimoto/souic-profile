"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function KeyboardNavigation() {
	const router = useRouter();

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
