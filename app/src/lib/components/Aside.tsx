import { AppShellAside } from "@mantine/core";

const Aside = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShellAside>
      <div className="p-2">{children}</div>
    </AppShellAside>
  );
};

export default Aside;
