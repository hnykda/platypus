import { AppShellMain } from "@mantine/core";

const DefaultPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShellMain>
      <div>{children}</div>
    </AppShellMain>
  );
};

export default DefaultPage;
