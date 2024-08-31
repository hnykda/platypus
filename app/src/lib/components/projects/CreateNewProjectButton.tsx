"use client";

import { createProjectAction } from "@/lib/actions/actions";
import { generateId } from "@/lib/utils";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNewProjectButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      leftSection={<IconPlus />}
      className="w-fit"
      loading={isLoading}
      onClick={() => {
        setIsLoading(true);
        const generatedId = generateId();
        createProjectAction(generatedId);
        router.push(`/projects/${generatedId}`);
        setIsLoading(false);
      }}
    >
      Add project
    </Button>
  );
}
