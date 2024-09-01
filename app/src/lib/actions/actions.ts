"use server";

import {
  createProject,
  deleteAllTasks,
  deleteProject,
  getProject,
  getProjects,
  getTasks,
  updateProject,
} from "../db/main";
import { Project, ProjectId } from "../db/types";
import { revalidatePath } from "next/cache";

export async function createProjectAction(id: ProjectId) {
  await createProject(id);
  revalidatePath("/projects");
}

export async function getProjectsAction() {
  return getProjects();
}

export async function getProjectAction(id: ProjectId) {
  return await getProject(id);
}

export async function deleteProjectAction(id: ProjectId) {
  await deleteProject(id);
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
}

export async function updateProjectAction(
  id: ProjectId,
  data: Partial<Project>
) {
  await updateProject(id, data);
  revalidatePath(`/projects/${id}`);
  // for project name change
  revalidatePath(`/projects`);
}

export async function getProjectTasksAction(id: ProjectId) {
  return getTasks(id);
}

export async function deleteAllTasksAction(id: ProjectId) {
  await deleteAllTasks(id);
  revalidatePath(`/projects/${id}`);
}
