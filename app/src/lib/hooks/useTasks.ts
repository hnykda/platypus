import { useState, useEffect } from "react";
import {
  deleteAllTasks as deleteAllTasksDb,
  getTasks,
  spawnTask as spawnTaskDb,
} from "@/lib/db/main";
import { TaskName, TaskFunctions } from "@/lib/db/tasks";
import { ProjectId, Task, TaskStatus } from "@/lib/db/types";
import { generateId } from "../utils";

export function useTasks(projectId: ProjectId) {
  const [projectTasks, setProjectTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const tasks = await getTasks(projectId);
    setProjectTasks(tasks);
  };

  useEffect(() => {
    fetchTasks();
    // Set up polling to refresh tasks periodically
    const intervalId = setInterval(fetchTasks, 5000);
    return () => clearInterval(intervalId);
  }, [projectId]);

  const spawnTask = async <T extends TaskName>(
    taskName: T,
    funcArgs: Parameters<TaskFunctions[T]>
  ) => {
    const newTaskId = generateId();
    // optimistic update
    setProjectTasks((prevTasks) => [
      {
        id: newTaskId,
        task_name: taskName,
        status: TaskStatus.PENDING,
        project_id: projectId,
        func_args: "",
      },
      ...prevTasks,
    ]);
    await spawnTaskDb(newTaskId, projectId, taskName, funcArgs);
    fetchTasks();
  };

  const deleteAllTasks = async () => {
    setProjectTasks([]);
    await deleteAllTasksDb(projectId);
  };

  return { projectTasks, spawnTask, deleteAllTasks };
}
