import { getProjectsAction } from "@/lib/actions/actions";
import DefaultPage from "@/lib/components/DefaultPage";
import ProjectsIndex from "@/lib/components/projects/ProjectsIndex";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ProjectsIndexPage() {
  // const projectsPromise = getProjectsAction();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: getProjectsAction,
  });

  return (
    <DefaultPage>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectsIndex />
      </HydrationBoundary>
    </DefaultPage>
  );
}
