"use client";

import { getProjectsAction } from "@/lib/actions/actions";
import CreateNewProjectButton from "@/lib/components/projects/CreateNewProjectButton";
import { deleteProject } from "@/lib/db/main";
import { Button } from "@mantine/core";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProjectId } from "@/lib/db/types";

const ProjectsIndex = () => {
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery(
    {
      queryKey: ["projects"],
      queryFn: getProjectsAction,
    },
    queryClient
  );

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: ProjectId) => {
      try {
        const result = await deleteProject(id);
        if (result.error) {
          throw new Error(result.error);
        }
      } catch (error) {
        console.log("An error occurred while deleting the project");
        throw error;
      }
    },
    onError: (error) => {
      console.error("handler", error);
    },
  });

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  if (!projects) {
    return <div>No projects found</div>;
  }

  return (
    <div className="flex flex-col gap-4 text-3xl">
      <CreateNewProjectButton />
      {projects.map((project) => (
        <div key={project.id} className="flex flex-row gap-2">
          <Link href={`/projects/${project.id}`} key={project.id}>
            <Button>{project.name}</Button>
          </Link>
          <Button
            variant="outline"
            color="red"
            onClick={() => {
              deleteProjectMutation.mutate(project.id);
            }}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ProjectsIndex;
