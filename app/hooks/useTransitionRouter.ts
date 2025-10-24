"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useTransitionRouter() {
	const router = useRouter();

	const push = useCallback(
		(href: string) => {
			// View Transitions APIのサポートチェック
			if (!document.startViewTransition) {
				router.push(href);
				return;
			}

			// トランジションを開始
			document.startViewTransition(() => {
				router.push(href);
			});
		},
		[router],
	);

	return {
		...router,
		push,
	};
}
