import ThemeToggle from "@/app/components/ThemeToggle";
import { TransitionLink } from "@/app/components/TransitionLink";
import { ArrowUturnLeftIcon as UturnIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import CareerTimeline from "./CareerTimeline";
import PortfolioKeyboardNavigation from "./PortfolioKeyboardNavigation";
import SplitText from "./SplitText";
import styles from "./portfolio.module.css";
import { projects } from "./projects";

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

export default function PortfolioPage() {
	const age = calculateAge();

	return (
		<div className={styles.portfolioContainer}>
			<ThemeToggle />
			<PortfolioKeyboardNavigation />
			<div
				className={`max-w-5xl mx-auto px-4 py-8 ${styles.contentWrapper}`}
			>
				{/* ヘッダー */}
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
								prefetch={true}
							>
								<div
									className={`h-60 sm:h-80 mt-8 text-left relative overflow-y-hidden ${styles.heroCard} ${styles.heroImageCard}`}
									style={{
										backgroundImage: "url(/icon2.webp)",
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
												<h2 className="text-2xl md:text-4xl sm:text-3xl font-extrabold leading-9 sm:leading-11">
													辻本宗一郎
													<br />
													wuhu1sland
												</h2>
												<p className="text-xs sm:text-sm mt-2 sm:mt-9">
													生年月日:2005年5月7日(
													{age}
													歳)
													<br />
													<br />
													同志社大学 理工学部
													<br />
													数理システム学科 2回生
													<br />
													同志社SF研究会(DSFA)
													2025年度会長
													<br />
													京大マイコンクラブ(KMC)
													49代入会
												</p>
											</div>
										</div>
									</div>
								</div>
							</TransitionLink>

							<TransitionLink
								href="/portfolio/career"
								className="block cursor-pointer"
								prefetch={true}
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
										prefetch={true}
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
						<div className="md:col-span-2 flex justify-center">
							<TransitionLink
								href="/"
								className={`text-sm font-bold transition mt-7 mb-7 ${styles.backLink}`}
							>
								<UturnIcon className="w-7 h-7" />
							</TransitionLink>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
