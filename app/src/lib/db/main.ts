"use server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any = null;

export type ProjectId = string;

export type Project = {
  id: ProjectId;
  name: string;
  created_at: string;
  content: string;
};

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
        content TEXT DEFAULT ''
      )
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
  return db.get("SELECT * FROM projects WHERE id = ?", id);
}

export async function updateProject(
  id: ProjectId,
  name: string,
  content: string
): Promise<Project | null> {
  db = await getDb();
  await db.run(
    "UPDATE projects SET name = ?, content = ? WHERE id = ?",
    name,
    content,
    id
  );
  return await getProject(id);
}

export async function deleteProject(id: ProjectId) {
  db = await getDb();
  await db.run("DELETE FROM projects WHERE id = ?", id);
}
