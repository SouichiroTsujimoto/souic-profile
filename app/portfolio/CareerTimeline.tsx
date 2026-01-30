"use client";

import styles from "./portfolio.module.css";

interface CareerEvent {
	date: string; // "YYYY/MM" format
	title: string;
	description?: string;
	icon: string; // emoji or icon
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

export default function CareerTimeline() {
	return (
		<div className={styles.timelineContainer}>
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
							{/* 中央：アイコン */}
							<div className="flex-shrink-0">
								<div className={styles.timelineIcon}>
									{event.icon}
								</div>
							</div>

							{/* 右側：タイトルと説明 */}
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
	);
}
