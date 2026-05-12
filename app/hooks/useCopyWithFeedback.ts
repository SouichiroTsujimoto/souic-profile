"use client";

import { writeClipboard } from "@/app/lib/copyToClipboard";
import { useCallback, useEffect, useRef, useState } from "react";

type CopyFeedback = { key: string; announce: string };

/**
 * クリップボードコピーと「コピーしました」系フィードバック（行単位の key + aria-live 用文言）。
 * 行を増やすときは `copy(row.key, row.value, announce)` と表示側の map を足すだけに揃えられる。
 */
export function useCopyWithFeedback(clearAfterMs = 2000) {
	const [feedback, setFeedback] = useState<CopyFeedback | null>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const copy = useCallback(
		async (key: string, text: string, announce: string) => {
			if (!(await writeClipboard(text))) return;
			if (timerRef.current) clearTimeout(timerRef.current);
			setFeedback({ key, announce });
			timerRef.current = setTimeout(() => {
				setFeedback(null);
				timerRef.current = null;
			}, clearAfterMs);
		},
		[clearAfterMs],
	);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	return {
		copy,
		copiedKey: feedback?.key ?? null,
		liveMessage: feedback?.announce ?? "",
	};
}
