"use client";

import { ActionBar } from "@/lib/components/ActionBar/ActionBar";
import Aside from "@/lib/components/Aside";
import DefaultPage from "@/lib/components/DefaultPage";
import { Navbar } from "@/lib/components/Navbar/Navbar";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function ProjectPage({ id }: { id: string }) {
  return (
    <>
      <DefaultPage>
        <div>I am just a project {id}</div>
      </DefaultPage>
      <Aside>
        <ActionBar />
      </Aside>
    </>
  );
}
