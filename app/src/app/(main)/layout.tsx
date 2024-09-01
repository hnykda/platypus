"use client";

import { Navbar } from "@/lib/components/Navbar/Navbar";
import {
  AppShell,
  Burger,
  AppShellHeader,
  AppShellNavbar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { TaskNames } from "@/lib/db/tasks";
import { EvidenceModal } from "@/lib/components/EvidenceModal";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <ModalsProvider modals={{ [TaskNames.SEARCH_FOR_EVIDENCE]: EvidenceModal }}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 50,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShellHeader>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Logo</div>
        </AppShellHeader>

        <AppShellNavbar>
          <Navbar />
        </AppShellNavbar>

        {children}
      </AppShell>
    </ModalsProvider>
  );
}
