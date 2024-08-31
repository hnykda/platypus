import { Tooltip, UnstyledButton, Stack, rem } from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  href: string;
}

function NavbarLink({ icon: Icon, label, href }: NavbarLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Link href={href}>
        <UnstyledButton
          className={classes.link}
          data-active={active || undefined}
        >
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home", href: "/" },
  { icon: IconGauge, label: "Projects", href: "/projects" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics", href: "/analytics" },
];

export function Navbar() {
  const links = mockdata.map((link) => (
    <NavbarLink {...link} key={link.label} href={link.href} />
  ));

  return (
    <>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink
          icon={IconSwitchHorizontal}
          label="Change account"
          href="/"
        />
        <NavbarLink icon={IconLogout} label="Logout" href="/" />
      </Stack>
    </>
  );
}
