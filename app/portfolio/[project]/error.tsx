"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ShowError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();

	useEffect(() => {
		console.error("Project error:", error);
	}, [error]);

	const backToPortfolio = () => {
		router.push("/portfolio");
	};

	return (
		<div
			className={"absolute flex items-center justify-center min-h-screen"}
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
								{error.message ||
									"プロジェクトの読み込み中にエラーが発生しました"}
							</div>
							<div className="flex gap-3 justify-center">
								<button
									onClick={backToPortfolio}
									className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
									type="button"
								>
									ポートフォリオに戻る
								</button>
								<button
									onClick={reset}
									className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition"
									type="button"
								>
									再試行
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
