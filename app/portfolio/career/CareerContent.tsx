"use client";

import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";

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
			className="absolute inset-0 flex items-center justify-center cursor-pointer"
			onClick={handleBackgroundClick}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					router.push("/portfolio");
				}
			}}
			tabIndex={-1}
		>
			<div
				className="max-w-2xl mx-auto relative z-10 cursor-default"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<div className="bg-white rounded-2xl shadow-2xl overflow-hidden mx-4 md:mx-0">
					<div className="relative p-8">
						<button
							type="button"
							className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
							onClick={() => router.push("/portfolio")}
							aria-label="閉じる"
						>
							<XIcon className="w-5 h-5" />
						</button>

						<h2 className="text-2xl font-bold text-gray-800 mb-6">
							キャリアタイムライン
						</h2>

						<div className="relative max-w-4xl mx-auto max-h-[60vh] overflow-y-auto pr-4">
							{/* タイムライン（縦線） */}
							<div
								className="absolute top-0 bottom-0 w-0.5 bg-gray-200"
								style={{ left: "29px" }}
							/>

							{/* イベント */}
							<div className="relative space-y-6">
								{careerEvents.map((event, index) => (
									<div
										key={`${event.date}-${index}`}
										className="relative flex items-start gap-4"
									>
										{/* アイコン */}
										<div className="flex-shrink-0">
											<div className="w-15 h-15 rounded-full bg-gray-100 flex items-center justify-center text-3xl shadow-sm">
												{event.icon}
											</div>
										</div>

										{/* タイトルと説明 */}
										<div className="flex-1 pt-0 pb-4 text-left">
											<p className="text-sm text-gray-500 font-medium">
												{event.date}
											</p>
											<h3 className="text-xl font-bold text-gray-800 mb-2">
												{event.title}
											</h3>
											{event.description && (
												<p className="text-base text-gray-600 leading-relaxed">
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
	);
}
