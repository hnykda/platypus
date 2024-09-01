import { getProjectAction } from "@/lib/actions/actions";
import ProjectDetail from "@/lib/components/projects/ProjectDetail";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ProjectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectAction(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDetail projectId={id} />
    </HydrationBoundary>
  );
}
