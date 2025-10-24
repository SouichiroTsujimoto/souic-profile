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
	const projectId = (await params).project;
	const id = Number.parseInt(projectId, 10);
	const project = projects.find((p) => p.id === id);

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
	const projectId = (await params).project;
	const id = Number.parseInt(projectId, 10);

	const project = projects.find((p) => p.id === id);

	if (!project || Number.isNaN(id)) {
		notFound();
	}

	return <ProjectContent project={project} />;
}
