import { ActionBar } from "@/lib/components/ActionBar/ActionBar";
import Aside from "@/lib/components/Aside";
import DefaultPage from "@/lib/components/DefaultPage";

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  return (
    <>
      <DefaultPage>{children}</DefaultPage>
      <Aside>
        <ActionBar projectId={id} />
      </Aside>
    </>
  );
}
