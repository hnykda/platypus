import { useState, useEffect } from "react";
import { getTasks, spawnTask as spawnTaskDb } from "@/lib/db/main";
import { TaskName, TaskFunctions } from "@/lib/db/tasks";
import { ProjectId, Task } from "@/lib/db/types";

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
    await spawnTaskDb(projectId, taskName, funcArgs);
    // Refresh tasks immediately after spawning a new one
    fetchTasks();
  };

  return { projectTasks, spawnTask };
}
