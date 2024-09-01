"use server";

import {
  addProjectEvidence,
  createProject,
  deleteAllEvidence,
  deleteAllTasks,
  deleteProject,
  deleteProjectEvidence,
  getProject,
  getProjectEvidence,
  getProjects,
  getTasks,
  updateProject,
} from "../db/main";
import { Evidence, Project, ProjectId } from "../db/types";
import { revalidatePath } from "next/cache";

const revalidateProject = (projectId: ProjectId) => {
  revalidatePath(`/projects/${projectId}`);
};

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
  revalidateProject(id);
}

export async function updateProjectAction(
  id: ProjectId,
  data: Partial<Project>
) {
  await updateProject(id, data);
  revalidateProject(id);
  // for project name change
  revalidatePath(`/projects`);
}

export async function getProjectTasksAction(id: ProjectId) {
  // kind of a hack to just force next to give us whatever is in the cache
  // let us handle the cache ourselves via react query
  revalidateProject(id);
  return getTasks(id);
}

export async function deleteAllTasksAction(id: ProjectId) {
  await deleteAllTasks(id);
  revalidateProject(id);
}

export async function addProjectEvidenceAction(
  projectId: ProjectId,
  evidence: Evidence[]
) {
  await addProjectEvidence(projectId, evidence);
  revalidateProject(projectId);
}

export async function getProjectEvidenceAction(projectId: ProjectId) {
  revalidateProject(projectId);
  return await getProjectEvidence(projectId);
}

export async function deleteProjectEvidenceAction(
  projectId: ProjectId,
  evidenceId: string
) {
  await deleteProjectEvidence(projectId, evidenceId);
  revalidateProject(projectId);
}

export async function deleteAllEvidenceAction(projectId: ProjectId) {
  await deleteAllEvidence(projectId);
  revalidateProject(projectId);
}
