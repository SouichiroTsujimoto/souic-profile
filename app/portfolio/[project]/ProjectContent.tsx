"use client";

import ThemeToggle from "@/app/components/ThemeToggle";
import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import type { Project } from "../projects";
import CloseButton from "./CloseButton";
import ImageGallery from "./ImageGallery";
import KeyboardNavigation from "./KeyboardNavigation";
import styles from "../portfolio.module.css";

export default function ProjectContent({
	project,
}: {
	project: Project;
}) {
	const router = useTransitionRouter();

	const handleBackgroundClick = (e: React.MouseEvent) => {
		// 背景（外側）をクリックした場合のみポートフォリオページに戻る
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
			<KeyboardNavigation />
			<div
				className={`max-h-[90vh] overflow-y-auto relative z-10 cursor-default ${styles.overlayContent} ${styles.projectOverlay}`}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<div className={`${styles.overlayPanel} ${styles.projectPanel}`}>
					<div className={styles.projectLayout}>
						<ImageGallery
							images={project.images}
							title={project.title}
							projectId={project.id}
						/>
						<div className={styles.projectInfo}>
							<CloseButton />
							<h2 className={styles.projectHeading}>
								{project.title}
							</h2>
							<p className={styles.projectYear}>
								{project.year}年
							</p>
							<p
								className={`${styles.projectDescriptionText} whitespace-pre-line`}
							>
								{project.description}
							</p>
							<div className="mb-4">
								<h3 className={styles.projectSectionTitle}>
									使用技術
								</h3>
								<div className="flex flex-wrap gap-2">
									{project.technologies.map((tech) => (
										<span
											key={`tech-${tech}`}
											className={styles.projectTag}
										>
											{tech}
										</span>
									))}
								</div>
							</div>
							<h3 className={styles.projectSectionTitle}>
								外部リンク
							</h3>
							<div className={styles.projectLinks}>
								{project.githubUrl && (
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.projectLink}
									>
										{project.githubUrlText || "GitHub"}
									</a>
								)}
								{project.githubUrl2 && (
									<a
										href={project.githubUrl2}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.projectLink}
									>
										{project.githubUrl2Text || "GitHub"}
									</a>
								)}
								{project.siteUrl && (
									<a
										href={project.siteUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.projectLink}
									>
										サイトを見る
									</a>
								)}
								{project.movieUrl && (
									<a
										href={project.movieUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.projectLink}
									>
										映像を見る
									</a>
								)}
								{project.installUrl && (
									<a
										href={project.installUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.projectLink}
									>
										{project.installUrlText ||
											"インストール"}
									</a>
								)}
								{project.installUrl2 && (
									<a
										href={project.installUrl2}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.projectLink}
									>
										{project.installUrl2Text ||
											"インストール"}
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
