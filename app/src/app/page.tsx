"use client";

import { ActionBar } from "@/lib/components/ActionBar/ActionBar";
import { Navbar } from "@/lib/components/Navbar/Navbar";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: "auto",
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
      <AppShell.Aside>
        <ActionBar />
      </AppShell.Aside>
    </AppShell>
  );
}
