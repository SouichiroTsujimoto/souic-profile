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
			<PortfolioKeyboardNavigation />
			<div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
				{/* ヘッダー */}
				<header className="mb-10 mt-16 sm:mt-8">
					<div className="max-w-5xl w-full h-auto z-10 text-center">
						<SplitText
							text="About"
							className=" text-3xl text-white font-bold text-center mb-8"
							delay={80}
							threshold={0.2}
							rootMargin="-15px"
						/>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
							<div>
								<div
									className={
										"h-60 sm:h-80 rounded-lg shadow-2xl mt-8 text-left relative overflow-y-hidden"
									}
									style={{
										backgroundImage: "url(/icon2.webp)",
										backgroundSize: "cover",
										backgroundPosition: "center",
									}}
								>
									{/* <div
										className="absolute inset-0 backdrop-blur-lg bg-gray-300/20 rounded-lg"
										style={{ zIndex: 1 }}
									/> */}
									<div
										className="relative flex flex-col p-6"
										style={{ zIndex: 2 }}
									>
										<div className="flex flex-col p-1 sm:p-6 text-white">
											<div className="text-left ">
												<h2 className="text-2xl md:text-4xl sm:text-3xl font-extrabold leading-9 sm:leading-11">
													<span
														className={
															"backdrop-blur-lg"
														}
													>
														辻本 宗一郎
													</span>
													<br />
													<span
														className={
															"backdrop-blur-lg"
														}
													>
														wuhu1sland
													</span>
												</h2>
												<p className="text-xs sm:text-sm mt-2 sm:mt-9">
													<span
														className={
															"backdrop-blur-lg"
														}
													>
														生年月日:2005年5月7日(
														{age}
														歳)
													</span>
													<br />
													<br />
													<span
														className={
															"backdrop-blur-lg"
														}
													>
														同志社大学 理工学部
													</span>
													<br />
													<span
														className={
															"backdrop-blur-lg"
														}
													>
														数理システム学科 2回生
													</span>
													<br />
													<span
														className={
															"backdrop-blur-lg"
														}
													>
														同志社SF研究会(DSFA)
													</span>
													<span
														className={
															"backdrop-blur-lg"
														}
													>
														2025年度会長
													</span>
													<br />
													<span
														className={
															"backdrop-blur-lg"
														}
													>
														京大マイコンクラブ(KMC)
													</span>
													<span
														className={
															"backdrop-blur-lg"
														}
													>
														49代入会
													</span>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div>
								<div
									className={
										"bg-white rounded-lg shadow-2xl mt-8"
									}
								>
									<div className="">
										<CareerTimeline />
									</div>
								</div>
							</div>
						</div>

						<SplitText
							text={"Works"}
							className="text-3xl text-white font-bold text-center"
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
										href={`/portfolio/${project.id}`}
										className={
											"bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-md transition cursor-pointer text-left block h-full"
										}
										prefetch={true}
									>
										<div className="flex flex-row h-full min-h-[200px]">
											<div className="relative w-1/2 overflow-hidden h-full">
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
												<h2 className="text-base font-semibold text-gray-800 mb-1">
													{project.title}
												</h2>
												<p className="text-xs text-gray-500 mb-1">
													{project.year}年
												</p>
												<p className="text-xs text-gray-600 mb-2 line-clamp-2">
													{project.description}
												</p>
												<div className="flex flex-wrap gap-1">
													{project.technologies
														.slice(0, 6)
														.map((tech) => (
															<span
																key={`${project.id}-${tech}`}
																className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700"
															>
																{tech}
															</span>
														))}
													{project.technologies
														.length > 6 && (
														<span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700">
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
								className="text-sm font-bold text-gray-900 hover:text-white transition mt-7 mb-7"
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
