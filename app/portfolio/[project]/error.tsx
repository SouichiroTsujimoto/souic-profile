"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "../portfolio.module.css";

export default function ShowError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();

	useEffect(() => {
		console.error("Project error:", error);
	}, [error]);

	const backToPortfolio = () => {
		router.push("/portfolio");
	};

	return (
		<div className={styles.overlayContainer}>
			<div
				className={`relative z-10 ${styles.overlayContent} ${styles.projectOverlay}`}
			>
				<div className={styles.overlayPanel}>
					<div className={`${styles.overlayBody} text-center`}>
						<div className={styles.errorTitle}>エラー</div>
						<div className={styles.errorText}>
							{error.message ||
								"プロジェクトの読み込み中にエラーが発生しました"}
						</div>
						<div className={styles.errorActions}>
							<button
								onClick={backToPortfolio}
								className={styles.actionButton}
								type="button"
							>
								ポートフォリオに戻る
							</button>
							<button
								onClick={reset}
								className={styles.actionButton}
								type="button"
							>
								再試行
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
