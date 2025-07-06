"use client";

import {
	ChevronDoubleLeftIcon as LeftChevIcon,
	ArrowUturnLeftIcon as UturnIcon,
	XMarkIcon as XIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./portfolio.module.css";
import { type Project, projects } from "./projects";
import SplitText from "./SplitText";
import SelectedImage from "./selectedImage";

export default function PortfolioPage() {
	const birthDate = new Date("2005-05-07");
	// 年齢計算
	const calculateAge = (): number => {
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
	};

	useEffect(() => {
		const handleKeyDown = (e: globalThis.KeyboardEvent) => {
			if (e.key === "Escape") {
				backToCard();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	function backToCard() {
		router.push("/");
	}

	const router = useRouter();
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const modalRef = useRef<HTMLDialogElement>(null);

	const handleProjectSelect = (project: Project) => {
		setSelectedProject(project);
	};

	// プロジェクト選択のキーボードハンドラー
	const handleProjectKeyDown = (
		e: KeyboardEvent<HTMLButtonElement>,
		project: Project,
	) => {
		if (e.key === "Enter" || e.key === " ") {
			handleProjectSelect(project);
		}
	};

	// 「一覧に戻る」ボタンのキーボードハンドラー
	const handleBackToListKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			setSelectedProject(null);
		}
	};

	// 画像をクリックしたときのハンドラー
	const handleImageClick = (imageUrl: string) => {
		setSelectedImage(imageUrl);
	};

	// モーダルを閉じるハンドラー
	const closeImageModal = () => {
		setSelectedImage(null);
	};

	// モーダルをキーボードで閉じるハンドラー
	const handleModalKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Escape") {
			closeImageModal();
		}
	};

	// モーダル内部divのキーボードイベントハンドラー
	const handleModalDivKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		// イベントの伝播を止めて、モーダル全体のクリックイベントが発火しないようにする
		e.stopPropagation();
	};

	const handleProjectClick = (project: Project) => {
		router.push(`/portfolio/${project.title}`);
	};

	return (
		<div className={styles.portfolioContainer}>
			<div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
				{/* ヘッダー */}
				<header className="mb-10 mt-16 sm:mt-8">
					<div className="flex flex-col items-center">
						{!selectedProject && (
							<div className="w-full h-auto z-10 text-center">
								<SplitText
									text="About"
									className="text-3xl text-gray-800 font-bold text-center mb-8"
									delay={80}
									threshold={0.2}
									rootMargin="-15px"
								/>

								<div
									className={
										"bg-white bg-opacity-85 rounded-lg shadow-md overflow-hidden backdrop-blur-sm mt-8 mb-16 md:text-left"
									}
								>
									<div className="flex flex-col md:flex-row p-6">
										<div className="md:w-1/3 flex justify-center items-start md:items-center mb-4 md:mb-0">
											<Image
												src="/icon.png"
												alt="プロフィール画像"
												className="rounded-full object-cover shadow-sm h-24 w-24 md:h-32 md:w-32"
												width={128}
												height={128}
											/>
										</div>
										<div className="md:w-2/3 md:pl-6">
											<h2 className="text-xl font-bold text-gray-800 mb-2">
												辻本 宗一郎
											</h2>
											<p className="text-sm text-gray-600 mb-4">
												2005年5月7日 生まれ ({calculateAge()}
												歳)
												<br />
												京都市在住
												<br />
												同志社大学 理工学部 数理システム学科 2回生
												<br />
												同志社SF研究会(DSFA) 会長
											</p>
											<p className="text-sm text-gray-700 mb-4">
												<strong>取得資格</strong>
												<br />
												応用情報技術者試験
												<br />
												統計検定2級
												<br />
												TOEIC 755点
												<br />
												HSK3級
											</p>
											<div className="flex gap-3 justify-center md:justify-start">
												<a
													href="https://github.com/SouichiroTsujimoto"
													target="_blank"
													rel="noopener noreferrer"
													className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition shadow-sm text-xs"
												>
													GitHub
												</a>
												<a
													href="https://x.com/wuhu1sland"
													target="_blank"
													rel="noopener noreferrer"
													className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition shadow-sm text-xs"
												>
													X
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						<SplitText
							text={selectedProject ? selectedProject.title : "Works"}
							className="text-3xl text-gray-800 font-bold text-center"
							delay={80}
							threshold={0.2}
							rootMargin="-15px"
						/>
					</div>
				</header>

				<main>
					<div className="flex flex-col space-y-4 items-center">
						{projects.map((project) => (
							<button
								key={project.id}
								className={`${styles.projectCard} bg-white bg-opacity-85 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer text-left`}
								onClick={() => handleProjectClick(project)}
								type="button"
							>
								<div className="flex flex-row h-full">
									<div className="relative w-1/2 overflow-hidden border-r border-gray-200">
										{project.images.length > 0 && (
											<Image
												src={project.images[0]}
												alt={project.title}
												height={500}
												width={500}
												className="object-cover h-full sm:w-full"
											/>
										)}
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
											{project.technologies.slice(0, 3).map((tech) => (
												<span
													key={`${project.id}-${tech}`}
													className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700"
												>
													{tech}
												</span>
											))}
											{project.technologies.length > 3 && (
												<span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700">
													+{project.technologies.length - 3}
												</span>
											)}
										</div>
									</div>
								</div>
							</button>
						))}
						<Link
							href="/"
							className="text-sm font-bold text-gray-800 hover:text-gray-600 transition mt-7 mb-7"
						>
							<UturnIcon className="w-7 h-7" />
						</Link>
					</div>
				</main>

				{/* 画像モーダル */}
				{selectedImage &&
					SelectedImage(
						closeImageModal,
						selectedImage,
						selectedProject?.title || "",
					)}

				{/* フッター */}
				<footer className="mt-8 mb-21 sm:mb-0 text-center text-gray-600 text-xs">
					<p>© 2025 Tsujimoto Souichiro</p>
				</footer>
			</div>
		</div>
	);
}
