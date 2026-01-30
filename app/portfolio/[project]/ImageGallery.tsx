"use client";

import Image from "next/image";
import { useState } from "react";
import SelectedImage from "./selectedImage";
import styles from "../portfolio.module.css";

interface ImageGalleryProps {
	images: string[];
	title: string;
	projectId: number;
}

export default function ImageGallery({
	images,
	title,
	projectId,
}: ImageGalleryProps) {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleImageClick = (imageUrl: string) => {
		setSelectedImage(imageUrl);
	};

	const closeImageModal = () => {
		setSelectedImage(null);
	};

	return (
		<>
			{selectedImage && (
				<SelectedImage
					onClose={closeImageModal}
					imageSrc={selectedImage}
					projectTitle={title}
				/>
			)}
			<div className={styles.projectMedia}>
				{images.length > 0 && (
					<button
						type="button"
						className="w-full p-0 border-0 bg-transparent"
						onClick={(e) => {
							e.stopPropagation();
							handleImageClick(images[0]);
						}}
					>
						<Image
							src={images[0]}
							alt={`${title}のメイン画像`}
							className={`${styles.projectImageMain} object-cover cursor-pointer mb-2`}
							style={{ maxHeight: "300px" }}
							width={500}
							height={300}
						/>
						<span className="sr-only">画像を拡大</span>
					</button>
				)}
				{images.length > 1 && (
					<div className="mt-2 grid grid-cols-2 gap-2">
						{images.slice(1).map((image) => (
							<button
								key={`${projectId}-${image}`}
								type="button"
								className="w-full p-0 border-0 bg-transparent"
								onClick={(e) => {
									e.stopPropagation();
									handleImageClick(image);
								}}
							>
								<Image
									src={image}
									alt={`${title}の画像`}
									className={`${styles.projectImageThumb} object-cover cursor-pointer h-24`}
									width={200}
									height={96}
								/>
								<span className="sr-only">画像を拡大</span>
							</button>
						))}
					</div>
				)}
			</div>
		</>
	);
}
