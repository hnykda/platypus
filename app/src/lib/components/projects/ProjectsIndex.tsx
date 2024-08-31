"use client";

import { getProjectsAction } from "@/lib/actions/actions";
import CreateNewProjectButton from "@/lib/components/projects/CreateNewProjectButton";
import { deleteProject } from "@/lib/db/main";
import { Button } from "@mantine/core";
import Link from "next/link";
import { use, useState } from "react";

const ProjectsIndex = ({
  projectsPromise,
}: {
  projectsPromise: ReturnType<typeof getProjectsAction>;
}) => {
  const projectsInitial = use(projectsPromise);
  const [projects, setProjects] = useState(projectsInitial);

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
              setProjects(projects.filter((p) => p.id !== project.id));
              deleteProject(project.id);
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
