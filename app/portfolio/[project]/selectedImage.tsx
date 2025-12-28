"use client";

import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SelectedImageProps {
	onClose: () => void;
	imageSrc: string;
	projectTitle: string;
}

export default function SelectedImage({
	onClose,
	imageSrc,
	projectTitle,
}: SelectedImageProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// モーダル表示中はスクロールを無効化
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	const handleClose = (e: React.MouseEvent | React.KeyboardEvent) => {
		// クリックイベントでモーダルを閉じる（背景クリック時）
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
			onClose();
		}
	};

	const modalContent = (
		<div
			aria-modal="true"
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
			onClick={handleClose}
			onKeyDown={handleKeyDown}
			tabIndex={-1}
		>
			<div
				className="relative w-[70vw] h-[70vh] flex items-center justify-center"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					className="absolute top-2 right-2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-gray-800 hover:bg-white transition-colors shadow-lg"
					onClick={onClose}
					aria-label="画像を閉じる"
				>
					<span className="sr-only">Close</span>
					<XIcon className="w-6 h-6" />
				</button>
				<Image
					src={imageSrc}
					alt={`プロジェクト画像 - ${projectTitle}`}
					className="object-contain max-w-full max-h-full rounded-lg shadow-2xl"
					width={1200}
					height={800}
					style={{
						width: "auto",
						height: "auto",
						maxWidth: "100%",
						maxHeight: "100%",
					}}
				/>
			</div>
		</div>
	);

	// createPortalでbody直下にレンダリング
	if (!mounted) return null;
	return createPortal(modalContent, document.body);
}
