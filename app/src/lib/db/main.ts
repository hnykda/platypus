"use server";

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";
import { TaskFunctions, TaskName } from "./tasks";
import { ProjectId, Project, Content, TaskStatus, Task } from "./types";
import { Queue } from "bullmq";
import { REDIS_HOST, REDIS_PORT } from "../constants";
import { revalidatePath } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any = null;

const dbPath = path.join(process.cwd(), "platypus.db");

const initializeDb = async () => {
  if (!fs.existsSync(dbPath)) {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT DEFAULT '',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        content TEXT DEFAULT '{}'
      );

      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        task_name TEXT NOT NULL,
        func_args TEXT NOT NULL,
        status TEXT NOT NULL,
        error TEXT DEFAULT '',
        result TEXT DEFAULT '',
        finished_at TEXT DEFAULT '',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }
};

const getDb = async () => {
  if (!db) {
    await initializeDb();
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  }
  return db;
};

export async function createProject(id: string): Promise<ProjectId> {
  db = await getDb();
  const result = await db.run(
    "INSERT INTO projects (id, name) VALUES (?, ?)",
    id,
    id
  );
  return result.lastId;
}

export async function getProjects(): Promise<Project[]> {
  db = await getDb();
  return db.all("SELECT * FROM projects ORDER BY created_at DESC");
}

export async function getProject(id: ProjectId): Promise<Project | null> {
  db = await getDb();
  const rawRecord = await db.get("SELECT * FROM projects WHERE id = ?", id);
  if (!rawRecord) {
    return null;
  }
  return {
    ...rawRecord,
    content: JSON.parse(rawRecord.content) as Content,
  };
}

export async function updateProject(
  id: ProjectId,
  name: string,
  content: string
): Promise<void> {
  db = await getDb();
  await db.run(
    "UPDATE projects SET name = ?, content = ? WHERE id = ?",
    name,
    content,
    id
  );
}

export async function deleteProject(id: ProjectId) {
  db = await getDb();
  return { error: "test" };
  await db.run("DELETE FROM projects WHERE id = ?", id);
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
}

async function createDbTask<T extends TaskName>(
  taskId: string,
  projectId: ProjectId,
  taskName: T,
  funcArgs: Parameters<TaskFunctions[T]>
) {
  await db.run(
    "INSERT INTO tasks (id, project_id, task_name, func_args, status) VALUES (?, ?, ?, ?, ?)",
    taskId,
    projectId,
    taskName,
    JSON.stringify(funcArgs),
    TaskStatus.PENDING
  );
}

export async function spawnTask<T extends TaskName>(
  taskId: string,
  projectId: ProjectId,
  taskName: T,
  funcArgs: Parameters<TaskFunctions[T]>
): Promise<{ spawned: true; taskId: string }> {
  createDbTask(taskId, projectId, taskName, funcArgs);

  const alphaQueue = new Queue("alpha", {
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT,
    },
  });

  await alphaQueue.add(
    taskName,
    {
      args: funcArgs,
    },
    {
      jobId: taskId,
    }
  );
  return { spawned: true, taskId };
}

// a separate process takes these tasks from the queue, runs them, and then updates the status in the database

export async function getTasks(projectId: ProjectId): Promise<Task[]> {
  db = await getDb();
  return db.all(
    "SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC",
    projectId
  );
}

export async function updateTask({
  taskId,
  status,
  error,
  result,
  finishedAt,
}: {
  taskId: string;
  status: TaskStatus;
  error: string;
  result: string;
  finishedAt: string;
}): Promise<void> {
  db = await getDb();
  await db.run(
    "UPDATE tasks SET status = ?, error = ?, result = ?, finished_at = ? WHERE id = ?",
    status,
    error,
    result,
    finishedAt,
    taskId
  );
}

export async function deleteAllTasks(projectId: ProjectId) {
  db = await getDb();
  await db.run("DELETE FROM tasks WHERE project_id = ?", projectId);
}
