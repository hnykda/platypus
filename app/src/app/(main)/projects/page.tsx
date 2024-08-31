import { getProjectsAction } from "@/lib/actions/actions";
import DefaultPage from "@/lib/components/DefaultPage";
import ProjectsIndex from "@/lib/components/projects/ProjectsIndex";
import { Suspense } from "react";

export default async function ProjectsIndexPage() {
  const projectsPromise = getProjectsAction();

  return (
    <DefaultPage>
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectsIndex projectsPromise={projectsPromise} />
      </Suspense>
    </DefaultPage>
  );
}
