"use client";

import { usePathname } from "next/navigation";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type PageTransitionContextValue = {
	shouldUseFallback: boolean;
	startFallback: () => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue>({
	shouldUseFallback: false,
	startFallback: () => {},
});

export function PageTransitionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [shouldUseFallback, setShouldUseFallback] = useState(false);

	useEffect(() => {
		const supportsViewTransition = "startViewTransition" in document;
		const media = window.matchMedia("(pointer: coarse), (max-width: 768px)");

		const update = () => {
			setShouldUseFallback(!supportsViewTransition || media.matches);
		};

		update();

		if (media.addEventListener) {
			media.addEventListener("change", update);
			return () => media.removeEventListener("change", update);
		}

		media.addListener(update);
		return () => media.removeListener(update);
	}, []);

	useEffect(() => {
		if (!isTransitioning) {
			return;
		}

		const id = requestAnimationFrame(() => {
			setIsTransitioning(false);
		});

		const fallbackTimer = window.setTimeout(() => {
			setIsTransitioning(false);
		}, 800);

		return () => {
			cancelAnimationFrame(id);
			window.clearTimeout(fallbackTimer);
		};
	}, [pathname, isTransitioning]);

	const startFallback = useCallback(() => {
		if (!shouldUseFallback) {
			return;
		}
		setIsTransitioning(true);
	}, [shouldUseFallback]);

	const value = useMemo(
		() => ({ shouldUseFallback, startFallback }),
		[shouldUseFallback, startFallback],
	);

	return (
		<PageTransitionContext.Provider value={value}>
			{children}
			<div
				className={`page-transition-overlay ${
					isTransitioning ? "is-active" : ""
				}`}
				aria-hidden="true"
			/>
		</PageTransitionContext.Provider>
	);
}

export function usePageTransition() {
	return useContext(PageTransitionContext);
}
