import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "../projects";
import ProjectContent from "./ProjectContent";

export async function generateStaticParams() {
	return projects.map((project) => ({
		project: project.id.toString(),
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ project: string }>;
}): Promise<Metadata> {
	const projectPath = (await params).project;
	const project = projects.find((p) => p.path === projectPath);

	if (!project) {
		return {
			title: "プロジェクトが見つかりません",
		};
	}

	return {
		title: `${project.title} | Portfolio`,
		description: project.description.slice(0, 160),
	};
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ project: string }>;
}) {
	const projectPath = (await params).project;
	const project = projects.find((p) => p.path === projectPath);

	if (!project) {
		notFound();
	}

	return <ProjectContent project={project} />;
}
