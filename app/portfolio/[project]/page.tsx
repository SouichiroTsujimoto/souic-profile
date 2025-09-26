import { notFound } from "next/navigation";
import { projects } from "../projects";
import ProjectContent from "./ProjectContent";

export default function ProjectPage({
	params,
}: {
	params: { project: string };
}) {
	const projectName = decodeURIComponent(params.project);
	const normalizedSearch = projectName.normalize("NFKC").toLowerCase();

	let selectedProject = projects.find((project) => {
		return (
			project.title.normalize("NFKC").toLowerCase() === normalizedSearch
		);
	});

	if (!selectedProject) {
		const projectId = Number.parseInt(projectName, 10);
		if (!Number.isNaN(projectId)) {
			selectedProject =
				projects.find((project) => project.id === projectId) ||
				undefined;
		}
	}

	if (!selectedProject) {
		notFound();
	}

	return <ProjectContent project={selectedProject} />;
}
