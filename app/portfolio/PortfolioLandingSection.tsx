import HomeScrollFab from "@/app/components/HomeScrollFab";
import { TransitionLink } from "@/app/components/TransitionLink";
import { PORTFOLIO_SECTION_ID } from "@/app/lib/homePortfolioNav";
import {
	PROFILE_AFFILIATION_DSFA,
	PROFILE_AFFILIATION_KMC,
	PROFILE_AFFILIATION_SCHOOL_LINE_1,
	PROFILE_AFFILIATION_SCHOOL_LINE_2,
	SITE_DISPLAY_NAME_JA,
	SITE_PROFILE_AVATAR_SRC,
	SITE_PUBLIC_HANDLE,
	calculateAge,
	formatProfileBirthDateJa,
} from "@/app/lib/siteProfile";
import Image from "next/image";
import { Suspense } from "react";
import ArticlesGrid from "./ArticlesGrid";
import CareerTimeline from "./CareerTimeline";
import PortfolioKeyboardNavigation from "./PortfolioKeyboardNavigation";
import SplitText from "./SplitText";
import styles from "./portfolio.module.css";
import { projects } from "./projects";

export default function PortfolioLandingSection() {
	const age = calculateAge();

	return (
		<div
			id={PORTFOLIO_SECTION_ID}
			className={styles.portfolioContainer}
			tabIndex={-1}
		>
			<PortfolioKeyboardNavigation />
			<div
				className={`max-w-5xl mx-auto px-4 pt-8 pb-32 ${styles.contentWrapper}`}
			>
				<header className="mb-10 mt-16 sm:mt-8">
					<div className="max-w-5xl w-full h-auto z-10 text-center">
						<SplitText
							text="About"
							className={`text-3xl font-bold text-center mb-8 ${styles.sectionHeading}`}
							delay={80}
							threshold={0.2}
							rootMargin="-15px"
						/>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
							<TransitionLink
								href="/portfolio/profile"
								className="block cursor-pointer"
							>
								<div
									className={`h-60 sm:h-80 mt-8 text-left relative overflow-y-hidden ${styles.heroCard} ${styles.heroImageCard}`}
									style={{
										backgroundImage: `url(${SITE_PROFILE_AVATAR_SRC})`,
										backgroundSize: "cover",
										backgroundPosition: "center",
									}}
								>
									<div
										className="relative flex flex-col p-6"
										style={{ zIndex: 2 }}
									>
										<div
											className={`flex flex-col p-1 sm:p-6 ${styles.heroImageText}`}
										>
											<div className="text-left ">
												<h2 className="text-4xl md:text-4xl sm:text-4xl font-extrabold leading-9 sm:leading-11">
													{SITE_DISPLAY_NAME_JA}@{SITE_PUBLIC_HANDLE}
												</h2>
												<p className="text-xs sm:text-sm mt-2 sm:mt-9">
													生年月日:
													{formatProfileBirthDateJa()}
													({age}
													歳)
													<br />
													<br />
													{PROFILE_AFFILIATION_SCHOOL_LINE_1}
													<br />
													{PROFILE_AFFILIATION_SCHOOL_LINE_2}
													<br />
													{PROFILE_AFFILIATION_DSFA}
													<br />
													{PROFILE_AFFILIATION_KMC}
												</p>
											</div>
										</div>
									</div>
								</div>
							</TransitionLink>

							<TransitionLink
								href="/portfolio/career"
								className="block cursor-pointer"
							>
								<div
									className={`mt-8 ${styles.heroCard} ${styles.timelineCard}`}
								>
									<div className="">
										<CareerTimeline />
									</div>
								</div>
							</TransitionLink>
						</div>

						<SplitText
							text={"Works"}
							className={`text-3xl font-bold text-center ${styles.sectionHeading}`}
							delay={80}
							threshold={0.2}
							rootMargin="-15px"
						/>
					</div>
				</header>

				<main>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{projects.map((project) => {
							if (project.id !== 0) {
								return (
									<TransitionLink
										key={project.id}
										href={`/portfolio/${project.path}`}
										className={styles.projectCard}
									>
										<div className="flex flex-row h-full min-h-[200px]">
											<div
												className={`relative w-1/2 overflow-hidden h-full ${styles.projectImage}`}
											>
												{project.images.length > 0 && (
													<Image
														src={project.images[0]}
														alt={project.title}
														width={500}
														height={500}
														className="object-cover w-full h-full object-center"
													/>
												)}
											</div>
											<div className="relative w-1/2 p-3">
												<h2
													className={`text-base font-semibold mb-1 ${styles.projectTitle}`}
												>
													{project.title}
												</h2>
												<p
													className={`text-xs mb-1 ${styles.projectMeta}`}
												>
													{project.year}年
												</p>
												<p
													className={`text-xs mb-2 line-clamp-2 ${styles.projectDescription}`}
												>
													{project.description}
												</p>
												<div className="flex flex-wrap gap-1">
													{project.technologies
														.slice(0, 6)
														.map((tech) => (
															<span
																key={`${project.id}-${tech}`}
																className={
																	styles.projectChip
																}
															>
																{tech}
															</span>
														))}
													{project.technologies
														.length > 6 && (
														<span
															className={
																styles.projectChip
															}
														>
															+
															{project
																.technologies
																.length - 6}
														</span>
													)}
												</div>
											</div>
										</div>
									</TransitionLink>
								);
							}
						})}
					</div>

					<Suspense fallback={null}>
						<ArticlesGrid />
					</Suspense>
				</main>
			</div>

			<HomeScrollFab className={styles.backFab} />
		</div>
	);
}
