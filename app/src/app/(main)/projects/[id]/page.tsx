import { getProjectAction } from "@/lib/actions/actions";
import { ActionBar } from "@/lib/components/ActionBar/ActionBar";
import Aside from "@/lib/components/Aside";
import DefaultPage from "@/lib/components/DefaultPage";
import ProjectDetail from "@/lib/components/projects/ProjectDetail";

export default function ProjectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const projectPromise = getProjectAction(id);

  return (
    <>
      <DefaultPage>
        <ProjectDetail projectPromise={projectPromise} />
      </DefaultPage>
      <Aside>
        <ActionBar />
      </Aside>
    </>
  );
}
