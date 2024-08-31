import { getProjectAction } from "@/lib/actions/actions";
import ProjectDetail from "@/lib/components/projects/ProjectDetail";

export default function ProjectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const projectPromise = getProjectAction(id);

  return <ProjectDetail projectPromise={projectPromise} />;
}
