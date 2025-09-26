export default function Loading() {
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
