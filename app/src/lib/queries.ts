import { queryOptions } from "@tanstack/react-query";
import { ProjectId } from "@/lib/db/types";
import { getProjectAction, getProjectTasksAction } from "@/lib/actions/actions";

export function getTasksQueryOptions(id: ProjectId) {
  return queryOptions({
    queryKey: ["tasks", id],
    queryFn: () => getProjectTasksAction(id),
    refetchInterval: 5 * 1000,
  });
}

export function getProjectQueryOptions(id: ProjectId) {
  return queryOptions({
    queryKey: ["project", id],
    queryFn: () => getProjectAction(id),
  });
}
