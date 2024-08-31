"use client";

import { getProjectAction } from "@/lib/actions/actions";
import { use } from "react";

const ProjectDetail = ({
  projectPromise,
}: {
  projectPromise: ReturnType<typeof getProjectAction>;
}) => {
  const project = use(projectPromise);
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <div>id: {project.id}</div>
      <div>name: {project.name}</div>
      <div>content: {project.content}</div>
      <div>created_at: {project.created_at}</div>
    </div>
  );
};

export default ProjectDetail;
