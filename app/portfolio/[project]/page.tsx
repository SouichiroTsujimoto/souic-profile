"use client";

import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type KeyboardEvent, useCallback, useEffect, useState } from "react";
import styles from "../portfolio.module.css";
import { type Project, projects } from "../projects";
import SelectedImage from "../selectedImage";

export default function ProjectPage({
	params,
}: {
	params: Promise<{ project: string }>;
}) {
	const router = useRouter();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [selectedProject, setSelectedProject] = useState<Project | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		console.log("ProjectPage: useEffect triggered");
		setLoading(true);
		setError(null);

		params
			.then(({ project }) => {
				console.log("ProjectPage: params received:", project);
				const projectName = decodeURIComponent(project);
				console.log("ProjectPage: decoded project name:", projectName);

				// より柔軟な検索：大文字小文字、全角半角を考慮
				let selectedProject = projects.find((p) => {
					const normalizedTitle = p.title
						.normalize("NFKC")
						.toLowerCase();
					const normalizedSearch = projectName
						.normalize("NFKC")
						.toLowerCase();
					return normalizedTitle === normalizedSearch;
				});

				// タイトルで検索できなかった場合、IDで検索（URLがIDの場合）
				if (!selectedProject) {
					const projectId = Number.parseInt(projectName);
					if (!isNaN(projectId)) {
						selectedProject = projects.find(
							(p) => p.id === projectId,
						);
					}
				}

				// それでも見つからない場合はnull
				selectedProject = selectedProject || null;

				console.log("ProjectPage: found project:", selectedProject);
				console.log(
					"ProjectPage: available projects:",
					projects.map((p) => p.title),
				);

				if (!selectedProject) {
					console.log(
						"ProjectPage: project not found, setting error",
					);
					setError(`プロジェクト "${projectName}" が見つかりません`);
				} else {
					console.log("ProjectPage: project found, setting project");
				}

				setSelectedProject(selectedProject);
				setLoading(false);
			})
			.catch((err) => {
				console.error("ProjectPage: error loading project:", err);
				setError("プロジェクトの読み込み中にエラーが発生しました");
				setLoading(false);
			});
	}, [params]);

	const handleImageClick = (imageUrl: string) => {
		setSelectedImage(imageUrl);
	};

	const closeImageModal = useCallback(() => {
		setSelectedImage(null);
	}, []);

	const backToPortfolio = useCallback(() => {
		router.push("/portfolio");
	}, [router]);

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
	}, [selectedImage, closeImageModal, backToPortfolio]);

	// エラー状態の場合
	if (error) {
		return (
			<div
				className={
					"absolute flex items-center justify-center min-h-screen"
				}
			>
				<div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
					<div
						className={
							"bg-white bg-opacity-85 rounded-lg shadow-md overflow-hidden backdrop-blur-sm"
						}
					>
						<div className="flex flex-col md:flex-row">
							<div className="md:w-full p-8 text-center">
								<div className="text-red-500 text-lg font-semibold mb-4">
									エラー
								</div>
								<div className="text-gray-700 mb-6">
									{error}
								</div>
								<button
									onClick={backToPortfolio}
									className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
									type="button"
								>
									ポートフォリオに戻る
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// ローディング状態の場合
	if (loading || !selectedProject) {
		return (
			<div
				className={
					"absolute flex items-center justify-center min-h-screen"
				}
			>
				<div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
					<div
						className={
							"bg-white bg-opacity-85 rounded-lg shadow-md overflow-hidden backdrop-blur-sm"
						}
					>
						<div className="flex flex-col md:flex-row">
							{/* 画像部分のスケルトン */}
							<div className="md:w-2/5 p-3">
								<div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse mb-2" />
								<div className="mt-2 grid grid-cols-2 gap-2">
									<div className="w-full h-24 bg-gray-200 rounded-lg animate-pulse" />
									<div className="w-full h-24 bg-gray-200 rounded-lg animate-pulse" />
								</div>
							</div>
							{/* コンテンツ部分のスケルトン */}
							<div className="md:w-3/5 p-4">
								{/* クローズボタンのスケルトン */}
								<div className="absolute right-5 top-4 w-5 h-5 bg-gray-200 rounded animate-pulse" />

								{/* タイトル部分にローディングテキストを表示 */}
								<div className="mt-7 mb-2">
									<div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-2" />
									<div className="text-center text-sm text-gray-500 font-medium">
										プロジェクトを読み込み中...
									</div>
								</div>

								{/* 年のスケルトン */}
								<div className="mb-2">
									<div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
								</div>

								{/* 説明文のスケルトン */}
								<div className="mb-4">
									<div className="h-4 bg-gray-200 rounded animate-pulse mb-1" />
									<div className="h-4 bg-gray-200 rounded animate-pulse mb-1" />
									<div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
								</div>

								{/* 使用技術のスケルトン */}
								<div className="mb-4">
									<div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/3" />
									<div className="flex flex-wrap gap-2">
										<div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
										<div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
										<div className="h-6 bg-gray-200 rounded-full animate-pulse w-14" />
										<div className="h-6 bg-gray-200 rounded-full animate-pulse w-18" />
									</div>
								</div>

								{/* 外部リンクのスケルトン */}
								<div>
									<div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/4" />
									<div className="flex flex-wrap gap-3">
										<div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
										<div className="h-8 bg-gray-200 rounded animate-pulse w-20" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={"absolute flex items-center justify-center min-h-screen"}
		>
			<div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
				{/* 画像モーダル */}
				{selectedImage &&
					SelectedImage(
						closeImageModal,
						selectedImage,
						selectedProject.title,
					)}

				<div
					className={
						"bg-white bg-opacity-85 rounded-lg shadow-md overflow-hidden backdrop-blur-sm"
					}
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
									{selectedProject.images
										.slice(1)
										.map((image, index) => (
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
								{selectedProject.movieUrl && (
									<a
										href={selectedProject.movieUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition shadow-sm text-xs"
									>
										映像を見る
									</a>
								)}
								{selectedProject.installUrl && (
									<a
										href={selectedProject.installUrl}
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
										href={selectedProject.installUrl2}
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
			</div>
		</div>
	);
}
