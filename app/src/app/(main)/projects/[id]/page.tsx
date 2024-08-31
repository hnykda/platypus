"use client";

import { ActionBar } from "@/lib/components/ActionBar/ActionBar";
import Aside from "@/lib/components/Aside";
import DefaultPage from "@/lib/components/DefaultPage";

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
