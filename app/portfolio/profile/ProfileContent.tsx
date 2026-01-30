"use client";

import ThemeToggle from "@/app/components/ThemeToggle";
import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import styles from "../portfolio.module.css";

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
				<div
					className={`${styles.overlayPanel} ${styles.imagePanel} text-left`}
					style={{
						backgroundImage: "url(/icon2.webp)",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{/* 背景全体をぼかすオーバーレイ */}
					<div
						className="absolute inset-0 backdrop-blur-lg"
						style={{ zIndex: 1 }}
					/>

					<button
						type="button"
						className={styles.overlayCloseButton}
						onClick={() => router.push("/portfolio")}
						aria-label="閉じる"
					>
						<XIcon className="w-5 h-5" />
					</button>

					<div className={styles.overlayBody}>
						<div>
							<h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
								辻本宗一郎 <br />
								wuhu1sland
							</h2>

							<div className="space-y-4 text-sm md:text-base">
								<div className="mt-4">
									<span className={styles.sectionTitle}>
										基本情報
									</span>
								</div>
								<p>生年月日: 2005年5月7日（{age}歳）</p>

								<div className="mt-4">
									<span className={styles.sectionTitle}>
										所属
									</span>
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
									<p className={styles.sectionTitle}>
										メインタグ
									</p>
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
											className={styles.tagChip}
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
