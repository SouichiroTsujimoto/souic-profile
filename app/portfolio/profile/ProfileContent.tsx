"use client";

import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";

function calculateAge(): number {
	const birthDate = new Date("2005-05-07");
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDiff = birthDate.getMonth() - today.getMonth();

	if (
		monthDiff > 0 ||
		(monthDiff === 0 && birthDate.getDate() > today.getDate())
	) {
		age--;
	}

	return age;
}

export default function ProfileContent() {
	const router = useTransitionRouter();
	const age = calculateAge();

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
				<div
					className="rounded-2xl shadow-2xl text-left relative overflow-hidden mx-4 md:mx-0"
					style={{
						backgroundImage: "url(/icon2.webp)",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{/* 背景全体をぼかすオーバーレイ */}
					<div
						className="absolute inset-0 backdrop-blur-sm bg-slate-500/15"
						style={{ zIndex: 1 }}
					/>

					<button
						type="button"
						className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
						onClick={() => router.push("/portfolio")}
						aria-label="閉じる"
					>
						<XIcon className="w-5 h-5" />
					</button>

					<div className="relative p-8 md:p-12" style={{ zIndex: 2 }}>
						<div className="text-white">
							<h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
								辻本 宗一郎
								<br />
								<span className="text-2xl md:text-3xl">
									wuhu1sland
								</span>
							</h2>

							<div className="space-y-4 text-sm md:text-base">
								<div className="mt-4">
									<span className="font-semibold">
										基本情報
									</span>
								</div>
								<p>生年月日: 2005年5月7日（{age}歳）</p>

								<div className="mt-4">
									<span className="font-semibold">所属</span>
								</div>
								<div className="space-y-1">
									<p>
										同志社大学 理工学部 数理システム学科
										2回生
									</p>
									<p>同志社SF研究会(DSFA) 2025年度会長</p>
									<p>京大マイコンクラブ(KMC) 49代入会</p>
								</div>

								<div className="mt-4">
									<p className="font-semibold">メインタグ</p>
								</div>
								<div className="flex flex-wrap gap-2">
									{[
										"TypeScript",
										"Go",
										"Rust",
										"JavaScript",
										"C++",
										"Next.js",
										"AWS",
										"Neovim",
										"Cursor",
										"Kea/Stork",
									].map((skill) => (
										<span
											key={skill}
											className="px-3 py-1 bg-white/20 rounded-full text-sm"
										>
											{skill}
										</span>
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
