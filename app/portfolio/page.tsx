import { TransitionLink } from "@/app/components/TransitionLink";
import { ArrowUturnLeftIcon as UturnIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
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
					<div className="flex flex-col items-center">
						<div className="max-w-2xl w-full h-auto z-10 text-center">
							<div>
								<SplitText
									text="About"
									className=" text-3xl text-gray-800 font-bold text-center mb-8"
									delay={80}
									threshold={0.2}
									rootMargin="-15px"
								/>

								<div
									className={
										"bg-opacity-85 backdrop-blur-lg rounded-lg shadow-2xl mt-8 mb-8 text-left"
									}
								>
									<div className="flex flex-row p-6">
										<div className="w-1/3 flex justify-center items-center mb-4 mb-0">
											<Image
												src="/icon.webp"
												alt="プロフィール画像"
												className="rounded-full object-cover shadow-sm"
												width={128}
												height={128}
											/>
										</div>
										<div className="w-2/3 pl-6">
											<h2 className="text-xl font-bold text-gray-800 mb-2">
												辻本 宗一郎
											</h2>
											<p className="text-sm text-gray-600 mb-4">
												生年月日:2005年5月7日({age}
												歳)
												<br />
												同志社大学 理工学部
												数理システム学科 2回生
												<br />
												同志社SF研究会(DSFA)
												2025年度会長
												<br />
												京大マイコンクラブ(KMC)
											</p>
											<p className="text-sm text-gray-700 mb-4">
												<strong>取得資格</strong>
												<br />
												応用情報技術者試験
												<br />
												統計検定2級
												<br />
												TOEIC 765点
												<br />
												HSK3級
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<SplitText
							text={"Works"}
							className="text-3xl text-gray-800 font-bold text-center"
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
								className="text-sm font-bold text-gray-800 hover:text-gray-600 transition mt-7 mb-7"
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
