import { TaskName } from "./tasks";

export type ProjectId = string;

export type Content = {
  targetQuestion: string;
};

export type Project = {
  id: ProjectId;
  name: string;
  created_at: string;
  content: Content;
};

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  FAILED = "failed",
  RUNNING = "running",
}

export type Task = {
  id: string;
  project_id: ProjectId;
  task_name: TaskName;
  func_args: string;
  status: TaskStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any;
  error?: string;
  finished_at?: string;
};
