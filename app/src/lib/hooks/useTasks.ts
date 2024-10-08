import {
  deleteAllTasks as deleteAllTasksDb,
  spawnTask as spawnTaskDb,
} from "@/lib/db/main";
import { TaskName, TaskFunctions } from "@/lib/db/tasks";
import { ProjectId } from "@/lib/db/types";
import { generateId } from "../utils";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getTasksQueryOptions } from "../queries";

export function useTasks(projectId: ProjectId) {
  const queryClient = useQueryClient();

  const { data: tasks } = useQuery(getTasksQueryOptions(projectId));

  const addNewTaskMutation = useMutation({
    mutationFn: async ({
      taskName,
      funcArgs,
    }: {
      taskName: TaskName;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      funcArgs: any[];
    }) => {
      const newTaskId = generateId();
      await spawnTaskDb(newTaskId, projectId, taskName, funcArgs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  const deleteAllTasksMutation = useMutation({
    mutationFn: () => deleteAllTasksDb(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  const spawnTask = async <T extends TaskName>(
    taskName: T,
    funcArgs: Parameters<TaskFunctions[T]>
  ) => {
    return addNewTaskMutation.mutate({ taskName, funcArgs });
  };

  return { spawnTask, deleteAllTasks: deleteAllTasksMutation.mutate, tasks };
}
