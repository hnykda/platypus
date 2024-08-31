"use client";

import { Navbar } from "@/lib/components/Navbar/Navbar";
import {
  AppShell,
  Burger,
  AppShellHeader,
  AppShellNavbar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
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
  );
}
