import { notFound } from "next/navigation";
import { projects } from "../projects";
import ProjectContent from "./ProjectContent";

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ project: string }>;
}) {
	const projectIndex = (await params).project;
	const index = Number.parseInt(projectIndex, 10);

	if (Number.isNaN(index) || index < 0 || index >= projects.length) {
		notFound();
	}

	const selectedProject = projects[index];

	return <ProjectContent project={selectedProject} />;
}
