import { ActionBar } from "@/lib/components/ActionBar/ActionBar";
import Aside from "@/lib/components/Aside";
import DefaultPage from "@/lib/components/DefaultPage";
import { getTasksQueryOptions, getProjectQueryOptions } from "@/lib/queries";
import { QueryClient } from "@tanstack/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const queryClient = new QueryClient();

  Promise.all([
    queryClient.prefetchQuery(getTasksQueryOptions(id)),
    queryClient.prefetchQuery(getProjectQueryOptions(id)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DefaultPage>{children}</DefaultPage>
      <Aside>
        <ActionBar projectId={id} />
      </Aside>
    </HydrationBoundary>
  );
}
