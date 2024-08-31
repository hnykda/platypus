import { ActionBar } from "@/lib/components/ActionBar/ActionBar";
import Aside from "@/lib/components/Aside";
import DefaultPage from "@/lib/components/DefaultPage";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DefaultPage>{children}</DefaultPage>
      <Aside>
        <ActionBar />
      </Aside>
    </>
  );
}
