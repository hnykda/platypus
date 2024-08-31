"use server";

import { createProject, getProject, getProjects } from "../db/main";
import { ProjectId } from "../db/types";

export async function createProjectAction(id: ProjectId) {
  return createProject(id);
}

export async function getProjectsAction() {
  return getProjects();
}

export async function getProjectAction(id: ProjectId) {
  return await getProject(id);
}
