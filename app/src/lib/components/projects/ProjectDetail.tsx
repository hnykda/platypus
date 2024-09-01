"use client";

import TargetQuestionForm from "./TargetQuestionForm";
import { useQuery } from "@tanstack/react-query";
import { getProjectQueryOptions } from "@/lib/queries";
import { Accordion, AccordionItem } from "@mantine/core";
import { EvidenceRegistry } from "./EvidenceRegistry";

const ProjectDetail = ({ projectId }: { projectId: string }) => {
  const { data: project, isLoading } = useQuery(
    getProjectQueryOptions(projectId)
  );

  if (isLoading) {
    return <div>Loading project...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="bg-gray-100 rounded-md p-1">ID: {project.id}</div>
        <div className="bg-gray-100 rounded-md p-1">Name: {project.name}</div>
        <div className="bg-gray-100 rounded-md p-1">
          Created At: {project.created_at}
        </div>
      </div>
      <TargetQuestionForm projectId={project.id} />
      <EvidenceRegistry projectId={project.id} />
      <Accordion className="w-1/2 max-w-xl mt-48">
        <AccordionItem value="content">
          <Accordion.Control>Raw Content</Accordion.Control>
          <Accordion.Panel>
            <pre className="bg-gray-100 p-4 rounded-md">
              {JSON.stringify(project.content, null, 2)}
            </pre>
          </Accordion.Panel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProjectDetail;
