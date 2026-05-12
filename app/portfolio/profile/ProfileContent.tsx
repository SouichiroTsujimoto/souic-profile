"use client";

import ThemeToggle from "@/app/components/ThemeToggle";
import { useCopyWithFeedback } from "@/app/hooks/useCopyWithFeedback";
import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import { navigateHomeFromPortfolioOverlay } from "@/app/lib/homePortfolioNav";
import {
	PROFILE_AFFILIATION_DSFA,
	PROFILE_AFFILIATION_KMC,
	SITE_CONTACT_EMAIL,
	SITE_DISPLAY_NAME_EN,
	SITE_DISPLAY_NAME_JA,
	SITE_PROFILE_AVATAR_SRC,
	SITE_PUBLIC_HANDLE,
	SITE_SIGNAL_USERNAME,
	calculateAge,
	formatProfileBirthDateJa,
	profileUniversityOneLine,
} from "@/app/lib/siteProfile";
import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import styles from "../portfolio.module.css";

const PROFILE_COPY_ROWS = [
	{
		key: "mail",
		prefix: "mail",
		ariaNoun: "メールアドレス",
		value: SITE_CONTACT_EMAIL,
	},
	{
		key: "signal",
		prefix: "Signal",
		ariaNoun: "Signal ユーザー名",
		value: SITE_SIGNAL_USERNAME,
	},
] as const;

export default function ProfileContent() {
	const router = useTransitionRouter();
	const age = calculateAge();
	const { copy, copiedKey, liveMessage } = useCopyWithFeedback();

	const handleBackgroundClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			navigateHomeFromPortfolioOverlay(router);
		}
	};

	return (
		<div
			className={`${styles.overlayContainer} cursor-pointer`}
			onClick={handleBackgroundClick}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					navigateHomeFromPortfolioOverlay(router);
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
						onClick={() => navigateHomeFromPortfolioOverlay(router)}
						aria-label="閉じる"
					>
						<XIcon className="w-5 h-5" />
					</button>

					<div className={styles.overlayBody}>
						<div>
							<p className="text-1xl md:text-2xl font-extrabold leading-tight">
								{SITE_DISPLAY_NAME_EN}
							</p>
							<p className="text-3xl md:text-5xl font-extrabold leading-tight">
								{SITE_DISPLAY_NAME_JA}
								<br />@{SITE_PUBLIC_HANDLE}
							</p>

							<div
								className={`space-y-4 text-sm md:text-base ${styles.profileContent}`}
							>
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
									<span className={styles.sectionTitle}>
										アカウント
									</span>
								</div>
								<div className="space-y-1">
									<p>
										GitHub:{" "}
										<a href="https://github.com/SouichiroTsujimoto">
											[SouichiroTsujimoto]
										</a>
									</p>
									<p>
										X:{" "}
										<a href="https://x.com/wuhu1sland">
											[@wuhu1sland]
										</a>
									</p>
									{PROFILE_COPY_ROWS.map((row) => (
										<p key={row.key}>
											{row.prefix}:{" "}
											<button
												type="button"
												className={
													styles.profileCopyControl
												}
												onClick={() =>
													copy(
														row.key,
														row.value,
														`${row.ariaNoun}をコピーしました`,
													)
												}
												aria-label={`${row.ariaNoun} ${row.value} をコピー`}
											>
												{row.value}
											</button>
											{copiedKey === row.key ? (
												<span
													className="ml-2 text-xs text-white/55"
													aria-hidden
												>
													コピーしました
												</span>
											) : null}
										</p>
									))}
									<span
										className="sr-only"
										aria-live="polite"
									>
										{liveMessage}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
