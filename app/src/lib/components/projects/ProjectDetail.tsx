"use client";

import { getProjectAction } from "@/lib/actions/actions";
import { use, useState } from "react";
import TargetQuestionForm from "./TargetQuestionForm";

const ProjectDetail = ({
  projectPromise,
}: {
  projectPromise: ReturnType<typeof getProjectAction>;
}) => {
  const project = use(projectPromise);

  if (!project) {
    return <div>Project not found</div>;
  }

  const [content, setContent] = useState(project.content);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="bg-gray-100 p-4 rounded-md">id: {project.id}</div>
        <div className="bg-gray-100 p-4 rounded-md">name: {project.name}</div>
        <div className="bg-gray-100 p-4 rounded-md">
          created_at: {project.created_at}
        </div>
      </div>
      <TargetQuestionForm
        projectId={project.id}
        content={content}
        setContent={setContent}
      />
      <span>Content</span>
      <pre className="bg-gray-100 p-4 rounded-md">
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
};

export default ProjectDetail;
