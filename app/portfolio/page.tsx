"use client";

import {
	ChevronDoubleLeftIcon as LeftChevIcon,
	ArrowUturnLeftIcon as UturnIcon,
	XMarkIcon as XIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { type KeyboardEvent, useRef, useState } from "react";
import SplitText from "./SplitText";
import styles from "./portfolio.module.css";

// プロジェクトデータの型定義
interface Project {
	id: number;
	title: string;
	description: string;
	images: string[]; // 単一のimageUrlから配列に変更
	technologies: string[];
	githubUrl?: string;
	siteUrl?: string;
	installUrl?: string;
	installUrlText?: string;
	installUrl2?: string;
	installUrl2Text?: string;
	year: string;
}

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

	// サンプルプロジェクトデータ
	const projects: Project[] = [
		{
			id: 1,
			title: "DUET+",
			description:
				"同志社大学の学生用ポータルサイトDUETに、より詳細な情報を表示させます。\n\n自身の成績を確認できるページに、各授業の成績分布情報や、同じ授業を受けた生徒の目安GPAなどを表示します。\n\nパソコン向けにはChrome、スマホ向けにはiOSのSafariの拡張機能として公開しています",
			images: ["/D+.png", "/duet+.png"],
			technologies: [
				"Typescript",
				"Chrome Extension",
				"Safari Extension",
				"Hono",
			],
			githubUrl: "https://github.com/SouichiroTsujimoto/duet-plus",
			installUrl:
				"https://chromewebstore.google.com/detail/mofjbejpdfdfkbiicjhimkodkijekjdk?utm_source=item-share-cb",
			installUrlText: "Chromeウェブストア",
			installUrl2: "https://apps.apple.com/jp/app/duet/id6743043491",
			installUrl2Text: "App Store (iOS)",
			year: "2024",
		},
		{
			id: 2,
			title: "w1eX",
			description:
				"数学などの授業のノート作成に特化したマークアップ言語です。VSCodeの拡張機能として提供され、.w1exファイルの保存時にリアルタイムでノートを生成します。\n\nMarkDownのような既存のマークアップ言語との差別化として、視覚的なノート作成に特化しています。数学の授業でのノート作成に自分で使用するために作りました。",
			images: ["/w1ex5.png"],
			technologies: ["Typescript", "VSCode Extension"],
			githubUrl: "https://github.com/SouichiroTsujimoto/w1eX",
			installUrl:
				"https://marketplace.visualstudio.com/items?itemName=SouichiroTsujimoto.w1ex",
			installUrlText: "VSCode Marketplace",
			year: "2024",
		},
		{
			id: 3,
			title: "souic-profile",
			description:
				"自身のプロフィールページです。このサイトの8割はCursor AgentでClaude3.7 Sonnetを用いて作りました。\n\nAgentはめちゃ便利でしたが、ReactやNext.jsの知識は正直全く身に付きませんでした。\n\n背景やテキストのアニメーションはreact bitsのものを使用しています。",
			images: ["/souic-profile4.png"],
			technologies: [
				"Typescript",
				"Next.js",
				"React",
				"Tailwind CSS",
				"Vercel",
			],
			siteUrl: "/",
			year: "2025",
		},
		{
			id: 4,
			title: "株式会社辻本エンジニアリング ホームページ",
			description:
				"株式会社辻本エンジニアリングの公式ホームページを制作しました。",
			images: ["/tsujimoto-eng4.png"],
			technologies: ["Typescript", "Astro", "Tailwind CSS", "Netlify"],
			siteUrl: "https://tsujimoto-engineering.netlify.app",
			year: "2024",
		},
		{
			id: 5,
			title: "同志社大学京田辺キャンパス 略称対応マップ",
			description:
				"同志社大学は各建物に非常に魅力的な名称を付けています。さらに、シラバス等では簡潔でルールのない略称が使われているため、略称から元の建物を推測するには豊かな想像力が必要です。\n\nそこで、建物名と略称とその位置を対応付けたマップを作成しました。",
			images: ["/dpmap.png"],
			technologies: ["Javascript", "Cloudflare Pages"],
			siteUrl: "https://dpmap-kyotanabe-campus.pages.dev",
			year: "2024",
		},
		{
			id: 6,
			title: "Grid",
			description: "2020年度SecHack365で制作したプログラミング言語です。",
			images: ["/Grid.png"],
			technologies: ["Nim", "C++"],
			siteUrl: "https://sechack365.nict.go.jp/achievement/2020/#c03",
			githubUrl: "https://github.com/SouichiroTsujimoto/Grid",
			year: "2020",
		},
	];

	const [selectedProject, setSelectedProject] = useState<Project | null>(
		null,
	);
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

	// キーボードイベントハンドラー（ボタン用）
	const handleImageKeyDown = (
		e: KeyboardEvent<HTMLButtonElement>,
		imageUrl: string,
	) => {
		if (e.key === "Enter" || e.key === " ") {
			handleImageClick(imageUrl);
		}
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
												2005年5月7日 生まれ (
												{calculateAge()}
												歳)
												<br />
												京都市在住
												<br />
												同志社大学 理工学部
												数理システム学科 2回生
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
							text={
								selectedProject
									? selectedProject.title
									: "Works"
							}
							className="text-3xl text-gray-800 font-bold text-center"
							delay={80}
							threshold={0.2}
							rootMargin="-15px"
						/>
					</div>
				</header>

				{/* メインコンテンツ */}
				<main>
					{selectedProject ? (
						// プロジェクト詳細表示
						<div
							className={`${styles.projectDetail} bg-white bg-opacity-85 rounded-lg shadow-md overflow-hidden backdrop-blur-sm`}
						>
							<div className="flex flex-col md:flex-row">
								<div className="md:w-2/5 p-3">
									{/* メイン画像（最初の画像）を表示 */}
									{selectedProject.images.length > 0 && (
										<button
											type="button"
											className="w-full p-0 border-0 bg-transparent"
											onClick={(e) => {
												e.stopPropagation();
												handleImageClick(
													selectedProject.images[0],
												);
											}}
											onKeyDown={(e) =>
												handleImageKeyDown(
													e,
													selectedProject.images[0],
												)
											}
										>
											<Image
												src={selectedProject.images[0]}
												alt={`${selectedProject.title}のメイン画像`}
												className="object-cover rounded-lg shadow-sm cursor-pointer mb-2"
												style={{ maxHeight: "300px" }}
												width={500}
												height={300}
											/>
											<span className="sr-only">
												画像を拡大
											</span>
										</button>
									)}

									{/* サブ画像（2枚目以降）があれば表示 */}
									{selectedProject.images.length > 1 && (
										<div className="mt-2 grid grid-cols-2 gap-2">
											{selectedProject.images
												.slice(1)
												.map((image, index) => (
													<button
														key={`${selectedProject.id}-sub-image-${index}`}
														type="button"
														className="w-full p-0 border-0 bg-transparent"
														onClick={(e) => {
															e.stopPropagation();
															handleImageClick(
																image,
															);
														}}
														onKeyDown={(e) =>
															handleImageKeyDown(
																e,
																image,
															)
														}
													>
														<Image
															src={image}
															alt={`${selectedProject.title}の画像 ${index + 2}`}
															className="object-cover rounded-lg shadow-sm cursor-pointer w-full h-24"
															width={200}
															height={96}
														/>
														<span className="sr-only">
															画像を拡大
														</span>
													</button>
												))}
										</div>
									)}
								</div>
								<div className="md:w-3/5 p-4">
									<button
										onClick={() => setSelectedProject(null)}
										onKeyDown={handleBackToListKeyDown}
										className="absolute right-5 text-xs text-gray-800 hover:text-gray-600 transition cursor-pointer"
										type="button"
									>
										<XIcon className="w-5 h-5" />
									</button>
									<h2 className="mt-7 text-xl font-bold text-gray-800 mb-2">
										{selectedProject.title}
									</h2>
									<p className="text-xs text-gray-500 mb-2">
										{selectedProject.year}年
									</p>
									<p className="text-sm text-gray-700 mb-4 whitespace-pre-line">
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

									<h3 className="text-sm font-semibold text-gray-800 mb-2">
										外部リンク
									</h3>
									<div className="flex flex-wrap gap-3 mb-3">
										{selectedProject.githubUrl && (
											<a
												href={selectedProject.githubUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition shadow-sm text-xs"
											>
												GitHub
											</a>
										)}
										{selectedProject.siteUrl && (
											<a
												href={selectedProject.siteUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition shadow-sm text-xs"
											>
												サイトを見る
											</a>
										)}
										{selectedProject.installUrl && (
											<a
												href={
													selectedProject.installUrl
												}
												target="_blank"
												rel="noopener noreferrer"
												className="px-3 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500 transition shadow-sm text-xs"
											>
												{selectedProject.installUrlText ||
													"インストール"}
											</a>
										)}
										{selectedProject.installUrl2 && (
											<a
												href={
													selectedProject.installUrl2
												}
												target="_blank"
												rel="noopener noreferrer"
												className="px-3 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-500 transition shadow-sm text-xs"
											>
												{selectedProject.installUrl2Text ||
													"インストール"}
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					) : (
						// プロジェクト一覧表示（縦に並べる）
						<div className="flex flex-col space-y-4 items-center">
							{projects.map((project) => (
								<button
									key={project.id}
									className={`${styles.projectCard} bg-white bg-opacity-85 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer text-left`}
									onClick={() => handleProjectSelect(project)}
									onKeyDown={(e) =>
										handleProjectKeyDown(e, project)
									}
									type="button"
								>
									<div className="flex flex-row h-full">
										<div className="relative w-1/2 overflow-hidden border-r border-gray-200">
											{/* メイン画像（最初の画像）のみ表示 */}
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
												{project.technologies.length >
													3 && (
													<span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700">
														+
														{project.technologies
															.length - 3}
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
					)}
				</main>

				{/* 画像モーダル */}
				{selectedImage && (
					<div
						aria-modal="true"
						className="fixed inset-0 z-50 flex items-center justify-center p-4 "
						onClick={(e) => {
							// クリックイベントでモーダルを閉じる（背景クリック時）
							if (e.target === e.currentTarget) {
								closeImageModal();
							}
						}}
						onKeyDown={handleModalKeyDown}
						tabIndex={-1}
					>
						<div
							className="relative max-w-4xl max-h-[90vh] overflow-auto bg-transparent"
							onClick={(e) => e.stopPropagation()} // 内側のコンテンツクリックでモーダルが閉じないようにする
							onKeyDown={(e) => e.stopPropagation()}
						>
							<button
								type="button"
								className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
								onClick={closeImageModal}
								aria-label="画像を閉じる"
							>
								<span className="sr-only">Close</span>
								<XIcon className="w-5 h-5" />
							</button>
							<Image
								src={selectedImage}
								alt={`プロジェクト画像 - ${selectedProject?.title || ""}`}
								className="object-contain"
								width={1200}
								height={800}
							/>
						</div>
					</div>
				)}

				{/* フッター */}
				<footer className="mt-8 mb-21 sm:mb-0 text-center text-gray-600 text-xs">
					<p>© 2025 Tsujimoto Souichiro</p>
				</footer>
			</div>
		</div>
	);
}
