import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function SelectedImage(
	setCloseImageModal: any,
	selectedImage: string,
	selectedProjectTitle: string,
) {
	return (
		<div
			aria-modal="true"
			className="fixed inset-0 z-50 flex items-center justify-center p-4 "
			onClick={(e) => {
				// クリックイベントでモーダルを閉じる（背景クリック時）
				if (e.target === e.currentTarget) {
					setCloseImageModal();
				}
			}}
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
					onClick={setCloseImageModal}
					aria-label="画像を閉じる"
				>
					<span className="sr-only">Close</span>
					<XIcon className="w-5 h-5" />
				</button>
				<Image
					src={selectedImage}
					alt={`プロジェクト画像 - ${selectedProjectTitle}`}
					className="object-contain"
					width={1200}
					height={800}
				/>
			</div>
		</div>
	);
}
