export default function Loading() {
	return (
		<div className="absolute flex items-center justify-center min-h-screen">
			<div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
				<div className="bg-white bg-opacity-85 rounded-lg shadow-md overflow-hidden backdrop-blur-sm">
					<div className="flex flex-col md:flex-row">
						{/* 画像エリアのスケルトン */}
						<div className="md:w-2/5 p-3">
							<div
								className="w-full bg-gray-200 rounded-lg shadow-sm animate-pulse mb-2"
								style={{ height: "300px" }}
							>
								<div className="flex items-center justify-center h-full">
									<svg
										className="w-12 h-12 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										aria-label="画像を読み込み中"
									>
										<title>画像を読み込み中</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</div>
							</div>
							{/* サブ画像のスケルトン */}
							<div className="mt-2 grid grid-cols-2 gap-2">
								<div className="w-full h-24 bg-gray-200 rounded-lg animate-pulse" />
								<div className="w-full h-24 bg-gray-200 rounded-lg animate-pulse" />
							</div>
						</div>

						{/* コンテンツエリアのスケルトン */}
						<div className="md:w-3/5 p-4">
							{/* 閉じるボタンのスケルトン */}
							<div className="absolute right-5 top-4 w-5 h-5 bg-gray-200 rounded animate-pulse" />

							{/* タイトルのスケルトン */}
							<div className="mt-7 mb-2">
								<div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
							</div>

							{/* 年のスケルトン */}
							<div className="mb-2">
								<div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
							</div>

							{/* 説明文のスケルトン */}
							<div className="mb-4 space-y-2">
								<div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
								<div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
								<div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
							</div>

							{/* 使用技術セクションのスケルトン */}
							<div className="mb-4">
								<div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2" />
								<div className="flex flex-wrap gap-2">
									<div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
									<div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
									<div className="h-6 bg-gray-200 rounded-full animate-pulse w-12" />
									<div className="h-6 bg-gray-200 rounded-full animate-pulse w-18" />
								</div>
							</div>

							{/* 外部リンクセクションのスケルトン */}
							<div>
								<div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2" />
								<div className="flex flex-wrap gap-3 mb-3">
									<div className="h-8 bg-gray-200 rounded-md animate-pulse w-20" />
									<div className="h-8 bg-gray-200 rounded-md animate-pulse w-24" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
