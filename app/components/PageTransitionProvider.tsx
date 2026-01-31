"use client";

import { usePathname } from "next/navigation";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

type PageTransitionContextValue = {
	shouldUseFallback: boolean;
	startTransition: () => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue>({
	shouldUseFallback: false,
	startTransition: () => {},
});

export function PageTransitionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [isFallbackActive, setIsFallbackActive] = useState(false);
	const [showSkeleton, setShowSkeleton] = useState(false);
	const [shouldUseFallback, setShouldUseFallback] = useState(false);
	const skeletonTimerRef = useRef<number | null>(null);
	const fallbackTimerRef = useRef<number | null>(null);

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

	const clearTimers = useCallback(() => {
		if (skeletonTimerRef.current) {
			window.clearTimeout(skeletonTimerRef.current);
			skeletonTimerRef.current = null;
		}
		if (fallbackTimerRef.current) {
			window.clearTimeout(fallbackTimerRef.current);
			fallbackTimerRef.current = null;
		}
	}, []);

	useEffect(() => {
		clearTimers();
		setIsFallbackActive(false);
		setShowSkeleton(false);
	}, [pathname, clearTimers]);

	const startTransition = useCallback(() => {
		clearTimers();
		setShowSkeleton(false);

		skeletonTimerRef.current = window.setTimeout(() => {
			setShowSkeleton(true);
		}, 320);

		if (shouldUseFallback) {
			setIsFallbackActive(true);
			fallbackTimerRef.current = window.setTimeout(() => {
				setIsFallbackActive(false);
				setShowSkeleton(false);
			}, 2000);
		}
	}, [shouldUseFallback, clearTimers]);

	const value = useMemo(
		() => ({ shouldUseFallback, startTransition }),
		[shouldUseFallback, startTransition],
	);

	const isOverlayVisible = isFallbackActive || showSkeleton;

	return (
		<PageTransitionContext.Provider value={value}>
			{children}
			<div
				className={`page-transition-overlay ${
					isOverlayVisible ? "is-active" : ""
				} ${showSkeleton ? "has-skeleton" : ""}`}
				aria-hidden="true"
			>
				{showSkeleton ? (
					<div className="page-transition-skeleton">
						<div className="skeleton-chip" />
						<div className="skeleton-row" />
						<div className="skeleton-row skeleton-row-short" />
						<div className="skeleton-row skeleton-row-medium" />
					</div>
				) : null}
			</div>
		</PageTransitionContext.Provider>
	);
}

export function usePageTransition() {
	return useContext(PageTransitionContext);
}
