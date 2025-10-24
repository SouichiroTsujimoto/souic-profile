"use client";

import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Project } from "../projects";
import SelectedImage from "../selectedImage";

export default function ProjectContent({
	project,
}: {
	project: Project;
}) {
	if (!project) {
		return null;
	}
	const router = useRouter();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
				if (selectedImage) {
					closeImageModal();
				} else {
					backToPortfolio();
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedImage, closeImageModal, backToPortfolio]);

	return (
		<div className="absolute flex items-center justify-center">
			<div className="max-w-2xl mx-auto relative z-10">
				{selectedImage &&
					SelectedImage(
						closeImageModal,
						selectedImage,
						project.title,
					)}
				<div className="bg-white bg-opacity-85 rounded-lg shadow-md overflow-hidden backdrop-blur-sm mx-10 md:m-0">
					<div className="flex flex-col md:flex-row ">
						<div className="md:w-2/5 p-3">
							{project.images.length > 0 && (
								<button
									type="button"
									className="w-full p-0 border-0 bg-transparent"
									onClick={(e) => {
										e.stopPropagation();
										handleImageClick(project.images[0]);
									}}
								>
									<Image
										src={project.images[0]}
										alt={`${project.title}のメイン画像`}
										className="object-cover rounded-lg shadow-sm cursor-pointer mb-2"
										style={{ maxHeight: "300px" }}
										width={500}
										height={300}
									/>
									<span className="sr-only">画像を拡大</span>
								</button>
							)}
							{project.images.length > 1 && (
								<div className="mt-2 grid grid-cols-2 gap-2">
									{project.images
										.slice(1)
										.map((image, index) => (
											<button
												key={`${project.id}-sub-image-${index}`}
												type="button"
												className="w-full p-0 border-0 bg-transparent"
												onClick={(e) => {
													e.stopPropagation();
													handleImageClick(image);
												}}
											>
												<Image
													src={image}
													alt={`${project.title}の画像 ${index + 2}`}
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
						<div className="md:w-3/5 p-4 overflow-y-auto max-h-96 md:max-h-none">
							<button
								onClick={backToPortfolio}
								className="absolute right-5 text-xs text-gray-800 hover:text-gray-600 transition cursor-pointer"
								type="button"
							>
								<XIcon className="w-5 h-5" />
							</button>
							<h2 className="mt-7 text-xl font-bold text-gray-800 mb-2">
								{project.title}
							</h2>
							<p className="text-xs text-gray-500 mb-2">
								{project.year}年
							</p>
							<p className="text-sm text-gray-700 mb-4 whitespace-pre-line">
								{project.description}
							</p>
							<div className="mb-4">
								<h3 className="text-sm font-semibold text-gray-800 mb-2">
									使用技術
								</h3>
								<div className="flex flex-wrap gap-2">
									{project.technologies.map((tech) => (
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
								{project.githubUrl && (
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition shadow-sm text-xs"
									>
										GitHub
									</a>
								)}
								{project.siteUrl && (
									<a
										href={project.siteUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition shadow-sm text-xs"
									>
										サイトを見る
									</a>
								)}
								{project.movieUrl && (
									<a
										href={project.movieUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition shadow-sm text-xs"
									>
										映像を見る
									</a>
								)}
								{project.installUrl && (
									<a
										href={project.installUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="px-3 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500 transition shadow-sm text-xs"
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
										className="px-3 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-500 transition shadow-sm text-xs"
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
