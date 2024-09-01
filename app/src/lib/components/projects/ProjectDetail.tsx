"use client";

import { getProjectAction } from "@/lib/actions/actions";
import TargetQuestionForm from "./TargetQuestionForm";
import { useQuery } from "@tanstack/react-query";

const ProjectDetail = ({ projectId }: { projectId: string }) => {
  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectAction(projectId),
  });

  if (isLoading) {
    return <div>Loading project...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="bg-gray-100 p-4 rounded-md">id: {project.id}</div>
        <div className="bg-gray-100 p-4 rounded-md">name: {project.name}</div>
        <div className="bg-gray-100 p-4 rounded-md">
          created_at: {project.created_at}
        </div>
      </div>
      <TargetQuestionForm projectId={project.id} />
      <span>Content</span>
      <pre className="bg-gray-100 p-4 rounded-md">
        {JSON.stringify(project.content, null, 2)}
      </pre>
    </div>
  );
};

export default ProjectDetail;
