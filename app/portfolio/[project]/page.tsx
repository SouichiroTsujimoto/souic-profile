"use client";

import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type KeyboardEvent, useEffect, useState } from "react";
import styles from "../portfolio.module.css";
import SelectedImage from "../selectedImage";

// プロジェクトデータの型定義
export interface Project {
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

// サンプルプロジェクトデータ
export const projects: Project[] = [
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
		technologies: ["Typescript", "Next.js", "React", "Tailwind CSS", "Vercel"],
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

export default function ProjectPage({
	params,
}: {
	params: Promise<{ project: string }>;
}) {
	const router = useRouter();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [projectName, setProjectName] = useState<string>("");
	const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
	useEffect(() => {
		params.then(({ project }) => {
			setProjectName(decodeURIComponent(project));
		});
	}, [params]);

	useEffect(() => {
		setSelectedProject(
			projects.find((project) => project.title === projectName) || projects[0],
		);
	}, [projectName]);

	const handleImageClick = (imageUrl: string) => {
		setSelectedImage(imageUrl);
	};

	const closeImageModal = () => {
		setSelectedImage(null);
	};

	useEffect(() => {
		const handleKeyDown = (e: globalThis.KeyboardEvent) => {
			if (e.key === "Escape") {
				// 画像モーダルが開いている場合は、まず画像モーダルを閉じる
				if (selectedImage) {
					closeImageModal();
				} else {
					// 画像モーダルが開いていない場合は、プロジェクトページを閉じる
					backToPortfolio();
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedImage]);

	function backToPortfolio() {
		router.push("/portfolio");
	}

	return (
		<div
			className={`${styles.portfolioContainer} flex items-center justify-center min-h-screen`}
		>
			<div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
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
										handleImageClick(selectedProject.images[0]);
									}}
								>
									<Image
										src={selectedProject.images[0]}
										alt={`${selectedProject.title}のメイン画像`}
										className="object-cover rounded-lg shadow-sm cursor-pointer mb-2"
										style={{ maxHeight: "300px" }}
										width={500}
										height={300}
									/>
									<span className="sr-only">画像を拡大</span>
								</button>
							)}

							{/* サブ画像（2枚目以降）があれば表示 */}
							{selectedProject.images.length > 1 && (
								<div className="mt-2 grid grid-cols-2 gap-2">
									{selectedProject.images.slice(1).map((image, index) => (
										<button
											key={`${selectedProject.id}-sub-image-${index}`}
											type="button"
											className="w-full p-0 border-0 bg-transparent"
											onClick={(e) => {
												e.stopPropagation();
												handleImageClick(image);
											}}
										>
											<Image
												src={image}
												alt={`${selectedProject.title}の画像 ${index + 2}`}
												className="object-cover rounded-lg shadow-sm cursor-pointer w-full h-24"
												width={200}
												height={96}
											/>
											<span className="sr-only">画像を拡大</span>
										</button>
									))}
								</div>
							)}
						</div>
						<div className="md:w-3/5 p-4">
							<button
								onClick={backToPortfolio}
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
									{selectedProject.technologies.map((tech) => (
										<span
											key={`tech-${tech}`}
											className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
										>
											{tech}
										</span>
									))}
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
										href={selectedProject.installUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="px-3 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500 transition shadow-sm text-xs"
									>
										{selectedProject.installUrlText || "インストール"}
									</a>
								)}
								{selectedProject.installUrl2 && (
									<a
										href={selectedProject.installUrl2}
										target="_blank"
										rel="noopener noreferrer"
										className="px-3 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-500 transition shadow-sm text-xs"
									>
										{selectedProject.installUrl2Text || "インストール"}
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
				{/* 画像モーダル */}
				{selectedImage &&
					SelectedImage(
						closeImageModal,
						selectedImage,
						selectedProject?.title || "",
					)}
			</div>
		</div>
	);
}
