"use client";

import ThemeToggle from "@/app/components/ThemeToggle";
import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import styles from "../portfolio.module.css";

interface CareerEvent {
	date: string;
	title: string;
	description?: string;
	icon: string;
}

const careerEvents: CareerEvent[] = [
	{
		date: "2025/08",
		title: "LINEヤフー internship",
		description:
			"2025年度のサマーインターンシップで、『セキュリティプラットフォーム（認証・認可、暗号鍵、電子証明書）の開発・運用』コースに参加しました。",
		icon: "🏢",
	},
	{
		date: "2024/06",
		title: "応用情報技術者試験",
		description:
			"2024年4月に行われた応用情報技術者試験を受験し合格しました。",
		icon: "📋",
	},
	{
		date: "2024/04",
		title: "大学入学",
		description: "同志社大学理工学部 数理システム学科に入学しました。",
		icon: "🏫",
	},
	{
		date: "2024/02",
		title: "Hashport internship",
		description:
			"Typescriptを用いたライブラリ開発等の業務を行っています。(継続中)",
		icon: "🏢",
	},
];

export default function CareerContent() {
	const router = useTransitionRouter();

	const handleBackgroundClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			router.push("/portfolio");
		}
	};

	return (
		<div
			className={`${styles.overlayContainer} cursor-pointer`}
			onClick={handleBackgroundClick}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					router.push("/portfolio");
				}
			}}
			tabIndex={-1}
		>
			<ThemeToggle />
			<div
				className={`${styles.overlayContent} cursor-default`}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<div className={styles.overlayPanel}>
					<div className={styles.overlayBody}>
						<button
							type="button"
							className={styles.overlayCloseButton}
							onClick={() => router.push("/portfolio")}
							aria-label="閉じる"
						>
							<XIcon className="w-5 h-5" />
						</button>

						<h2 className={styles.overlayTitle}>
							キャリアタイムライン
						</h2>

						<div
							className={`${styles.timelineContainer} ${styles.timelineContainerLarge}`}
						>
							<div className={styles.timelineInner}>
								{/* タイムライン（縦線） */}
								<div className={styles.timelineLine} />

								{/* イベント */}
								<div className={styles.timelineItems}>
									{careerEvents.map((event, index) => (
										<div
											key={`${event.date}-${index}`}
											className={styles.timelineItem}
										>
											{/* アイコン */}
											<div className="flex-shrink-0">
												<div className={styles.timelineIcon}>
													{event.icon}
												</div>
											</div>

											{/* タイトルと説明 */}
											<div className={styles.timelineBody}>
												<p className={styles.timelineDate}>
													{event.date}
												</p>
												<h3 className={styles.timelineTitle}>
													{event.title}
												</h3>
												{event.description && (
													<p className={styles.timelineDescription}>
														{event.description}
													</p>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
