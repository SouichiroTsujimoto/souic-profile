"use client";

import ThemeToggle from "@/app/components/ThemeToggle";
import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import {
	PROFILE_AFFILIATION_DSFA,
	PROFILE_AFFILIATION_KMC,
	PROFILE_MAIN_SKILL_TAGS,
	SITE_DISPLAY_NAME_JA,
	SITE_PROFILE_AVATAR_SRC,
	SITE_PUBLIC_HANDLE,
	calculateAge,
	formatProfileBirthDateJa,
	profileUniversityOneLine,
} from "@/app/lib/siteProfile";
import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import styles from "../portfolio.module.css";

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
				>
					{/* 背景画像そのものに blur を適用（backdrop-filter のラグ回避） */}
					<div
						aria-hidden="true"
						className={styles.profileBlurredBg}
						style={{
							backgroundImage: `url(${SITE_PROFILE_AVATAR_SRC})`,
						}}
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
								{SITE_DISPLAY_NAME_JA} <br />
								{SITE_PUBLIC_HANDLE}
							</h2>

							<div className="space-y-4 text-sm md:text-base">
								<div className="mt-4">
									<span className={styles.sectionTitle}>
										基本情報
									</span>
								</div>
								<p>
									生年月日: {formatProfileBirthDateJa()}（
									{age}歳）
								</p>

								<div className="mt-4">
									<span className={styles.sectionTitle}>
										所属
									</span>
								</div>
								<div className="space-y-1">
									<p>{profileUniversityOneLine()}</p>
									<p>{PROFILE_AFFILIATION_DSFA}</p>
									<p>{PROFILE_AFFILIATION_KMC}</p>
								</div>

								<div className="mt-4">
									<p className={styles.sectionTitle}>
										メインタグ
									</p>
								</div>
								<div className="flex flex-wrap gap-2">
									{PROFILE_MAIN_SKILL_TAGS.map((skill) => (
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
