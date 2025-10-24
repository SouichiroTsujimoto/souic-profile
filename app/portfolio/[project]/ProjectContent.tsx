import type { Project } from "../projects";
import CloseButton from "./CloseButton";
import ImageGallery from "./ImageGallery";
import KeyboardNavigation from "./KeyboardNavigation";

export default function ProjectContent({
	project,
}: {
	project: Project;
}) {
	return (
		<div className="absolute flex items-center justify-center">
			<KeyboardNavigation />
			<div className="max-w-2xl mx-auto relative z-10">
				<div className="bg-white bg-opacity-85 rounded-lg shadow-md overflow-hidden backdrop-blur-sm mx-10 md:m-0">
					<div className="flex flex-col md:flex-row ">
						<ImageGallery
							images={project.images}
							title={project.title}
							projectId={project.id}
						/>
						<div className="md:w-3/5 p-4 overflow-y-auto max-h-96 md:max-h-none">
							<CloseButton />
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
