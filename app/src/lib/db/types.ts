
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
  FAILED = "failed"
}
