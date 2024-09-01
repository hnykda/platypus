import ProjectDetail from "@/lib/components/projects/ProjectDetail";



export default async function ProjectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ProjectDetail projectId={id} />;
}
