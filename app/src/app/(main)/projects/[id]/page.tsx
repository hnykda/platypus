"use client";

import { ActionBar } from "@/lib/components/ActionBar/ActionBar";
import { Navbar } from "@/lib/components/Navbar/Navbar";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function ProjectPage({ id }: { id: string }) {
  return (
    <>
      <AppShell.Main>
        <div>I am just a project {id}</div>
      </AppShell.Main>
      <AppShell.Aside>
        <ActionBar />
      </AppShell.Aside>
    </>
  );
}
