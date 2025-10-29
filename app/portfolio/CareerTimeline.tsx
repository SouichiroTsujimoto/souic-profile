"use client";

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
		date: "2025/04",
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
		<div className="w-full max-h-80 overflow-y-auto py-4 p-6">
			<div className="relative max-w-4xl mx-auto">
				{/* タイムライン（縦線） */}
				<div
					className="absolute top-0 bottom-0 w-0.5 bg-gray-300"
					style={{ left: "29px" }}
				/>

				{/* イベント */}
				<div className="relative space-y-5">
					{careerEvents.map((event, index) => (
						<div
							key={`${event.date}-${index}`}
							className="relative flex items-start gap-3"
						>
							{/* 中央：アイコン */}
							<div className="flex-shrink-0">
								<div className="w-15 h-15 rounded-full bg-gray-100 flex items-center justify-center text-2xl shadow-sm">
									{event.icon}
								</div>
							</div>

							{/* 右側：タイトルと説明 */}
							<div className="flex-1 pt-0 pb-4 text-left">
								<p className="text-sm text-gray-500 text-xs font-medium">
									{event.date}
								</p>
								<h3 className="text-lg font-bold text-gray-800 mb-2">
									{event.title}
								</h3>
								{event.description && (
									<p className="text-sm text-gray-600 leading-relaxed">
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
