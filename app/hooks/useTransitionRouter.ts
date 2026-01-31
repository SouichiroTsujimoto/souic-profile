"use client";

import { useRouter } from "next/navigation";
import { useTransitionRouter as useNVTRouter } from "next-view-transitions";
import { useCallback } from "react";
import { usePageTransition } from "../components/PageTransitionProvider";

export function useTransitionRouter() {
	const router = useRouter();
	const nvtRouter = useNVTRouter();
	const { shouldUseFallback, startTransition } = usePageTransition();

	const push = useCallback(
		(href: string, options?: { scroll?: boolean }) => {
			startTransition();
			if (shouldUseFallback) {
				router.push(href, options);
				return;
			}
			nvtRouter.push(href, options);
		},
		[shouldUseFallback, startTransition, router, nvtRouter],
	);

	const replace = useCallback(
		(href: string, options?: { scroll?: boolean }) => {
			startTransition();
			if (shouldUseFallback) {
				router.replace(href, options);
				return;
			}
			nvtRouter.replace(href, options);
		},
		[shouldUseFallback, startTransition, router, nvtRouter],
	);

	const baseRouter = shouldUseFallback ? router : nvtRouter;

	return {
		...baseRouter,
		push,
		replace,
	};
}
