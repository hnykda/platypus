"use client";

import { ActionBar } from "@/lib/components/ActionBar/ActionBar";
import { Navbar } from "@/lib/components/Navbar/Navbar";
import { AppShell, Burger, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

const mockedProjects = [
  { id: "1", name: "Project 1" },
  { id: "2", name: "Project 2" },
  { id: "3", name: "Project 3" },
];

export default function ProjectsIndexPage() {
  return (
    <>
      <AppShell.Main>
        <div className="flex flex-col gap-4 text-3xl">
          {mockedProjects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <Button>{project.name}</Button>
            </Link>
          ))}
        </div>
      </AppShell.Main>
    </>
  );
}
