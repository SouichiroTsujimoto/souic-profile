"use client";

import Link from "next/link";
import { useState } from "react";
import AnimatedContent from "./AnimatedContent";
import styles from "./portfolio.module.css";

// プロジェクトデータの型定義
interface Project {
	id: number;
	title: string;
	description: string;
	imageUrl: string;
	technologies: string[];
	githubUrl?: string;
	demoUrl?: string;
	year: string;
}

export default function PortfolioPage() {
	// サンプルプロジェクトデータ
	const projects: Project[] = [
		{
			id: 1,
			title: "ポートフォリオサイト",
			description:
				"Next.jsとTailwind CSSを使用して構築した個人ポートフォリオサイト。3Dカード効果を実装しています。",
			imageUrl: "/souic19.png",
			technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OGL"],
			githubUrl: "https://github.com/SouichiroTsujimoto/portfolio",
			demoUrl: "https://souic-profile.vercel.app/",
			year: "2024",
		},
		{
			id: 2,
			title: "プロジェクト2",
			description:
				"サンプルプロジェクト2の説明文をここに入力します。プロジェクトの目的や特徴について簡潔に説明します。",
			imageUrl: "/souic19.png",
			technologies: ["React", "Node.js", "MongoDB"],
			githubUrl: "https://github.com/SouichiroTsujimoto/project2",
			year: "2023",
		},
		{
			id: 3,
			title: "プロジェクト3",
			description:
				"サンプルプロジェクト3の説明文。実際のプロジェクト内容に合わせて更新してください。",
			imageUrl: "/souic19.png",
			technologies: ["Vue.js", "Express", "PostgreSQL"],
			demoUrl: "https://project3-demo.com",
			year: "2022",
		},
	];

	const [selectedProject, setSelectedProject] = useState<Project | null>(
		null,
	);

	const handleProjectSelect = (project: Project) => {
		setSelectedProject(project);
	};

	return (
		<div className={styles.portfolioContainer}>
			<div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
				{/* ヘッダー */}
				<header className="mb-6">
					<div className="flex flex-col items-center mb-6">
						<h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
							ポートフォリオ
						</h1>
						<Link
							href="/"
							className="text-sm font-bold text-gray-800 hover:text-gray-600 transition"
						>
							← ホームに戻る
						</Link>
					</div>
				</header>

				{/* メインコンテンツ */}
				<main>
					{selectedProject ? (
						<AnimatedContent
							distance={50}
							direction="vertical"
							reverse={false}
							config={{ tension: 80, friction: 20 }}
							initialOpacity={0.2}
							animateOpacity
							scale={1.1}
							threshold={0.2}
						>
							<div
								className={`${styles.projectDetail} bg-white bg-opacity-85 rounded-lg shadow-md overflow-hidden backdrop-blur-sm`}
							>
								<div className="flex flex-col md:flex-row">
									<div className="md:w-2/5 p-3">
										<img
											src={selectedProject.imageUrl}
											alt={selectedProject.title}
											className="object-cover rounded-lg shadow-sm"
											style={{ maxHeight: "300px" }}
										/>
									</div>
									<div className="md:w-3/5 p-4">
										<button
											onClick={() =>
												setSelectedProject(null)
											}
											className="mb-3 text-xs text-gray-600 hover:text-gray-800 transition"
											type="button"
										>
											← 一覧に戻る
										</button>
										<h2 className="text-xl font-bold text-gray-800 mb-2">
											{selectedProject.title}
										</h2>
										<p className="text-xs text-gray-500 mb-2">
											{selectedProject.year}年
										</p>
										<p className="text-sm text-gray-700 mb-4">
											{selectedProject.description}
										</p>

										<div className="mb-4">
											<h3 className="text-sm font-semibold text-gray-800 mb-2">
												使用技術
											</h3>
											<div className="flex flex-wrap gap-2">
												{selectedProject.technologies.map(
													(tech) => (
														<span
															key={`tech-${tech}`}
															className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
														>
															{tech}
														</span>
													),
												)}
											</div>
										</div>

										<div className="flex flex-wrap gap-3 mb-3">
											{selectedProject.githubUrl && (
												<a
													href={
														selectedProject.githubUrl
													}
													target="_blank"
													rel="noopener noreferrer"
													className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition shadow-sm text-xs"
												>
													GitHubを見る
												</a>
											)}
											{selectedProject.demoUrl && (
												<a
													href={
														selectedProject.demoUrl
													}
													target="_blank"
													rel="noopener noreferrer"
													className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition shadow-sm text-xs"
												>
													デモを見る
												</a>
											)}
										</div>
									</div>
								</div>
							</div>
						</AnimatedContent>
					) : (
						<AnimatedContent
							distance={50}
							direction="vertical"
							reverse={false}
							config={{ tension: 80, friction: 20 }}
							initialOpacity={0.2}
							animateOpacity
							scale={1.1}
							threshold={0.2}
						>
							<div className="flex flex-col space-y-4">
								{projects.map((project) => (
									<button
										key={project.id}
										className={`${styles.projectCard} bg-white bg-opacity-85 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer text-left`}
										onClick={() =>
											handleProjectSelect(project)
										}
										type="button"
									>
										<div className="flex flex-row">
											<div className="w-1/2 h-full overflow-hidden">
												<img
													src={project.imageUrl}
													alt={project.title}
													className="object-cover"
												/>
											</div>
											<div className="w-1/2 p-3">
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
														.slice(0, 3)
														.map((tech) => (
															<span
																key={`${project.id}-${tech}`}
																className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700"
															>
																{tech}
															</span>
														))}
													{project.technologies
														.length > 3 && (
														<span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700">
															+
															{project
																.technologies
																.length - 3}
														</span>
													)}
												</div>
											</div>
										</div>
									</button>
								))}
							</div>
						</AnimatedContent>
					)}
				</main>

				{/* フッター */}
				<footer className="mt-8 text-center text-gray-600 text-xs">
					<p>© 2024 Souichiro Tsujimoto. All rights reserved.</p>
				</footer>
			</div>
		</div>
	);
}
