"use client";

import { getProjectsAction, deleteProjectAction } from "@/lib/actions/actions";
import CreateNewProjectButton from "@/lib/components/projects/CreateNewProjectButton";
import { Button } from "@mantine/core";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

const ProjectsIndex = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjectsAction,
  });

  // docs hint: make sure to still call revalidatePath inside the mutationFn to
  // so the projects get re-fetched (it somehow magically works without having
  // to invalidate the query manually)
  const deleteProjectMutation = useMutation({
    mutationFn: deleteProjectAction,
    onSuccess: () => {
      notifications.show({
        title: "Project deleted",
        message: "The project has been deleted",
        color: "green",
      });
    },
    onError: (error, variables) => {
      notifications.show({
        title: `We couldn't delete the project '${variables}'`,
        message: error.message,
        color: "red",
      });
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
