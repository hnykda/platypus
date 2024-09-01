"use client";

import {
  Text,
  rem,
  Button,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAllEvidenceAction,
  deleteProjectEvidenceAction,
  getProjectEvidenceAction,
} from "@/lib/actions/actions";

export function EvidenceRegistry({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient();

  const { data: evidence } = useQuery({
    queryKey: ["evidence", projectId],
    queryFn: () => getProjectEvidenceAction(projectId),
  });

  const { mutate: deleteEvidence, isPending: isDeletingEvidence } = useMutation(
    {
      mutationFn: (evidenceId: string) =>
        deleteProjectEvidenceAction(projectId, evidenceId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["evidence", projectId] });
      },
    }
  );

  const { mutate: deleteAllEvidence, isPending: isDeletingAllEvidence } =
    useMutation({
      mutationFn: () => deleteAllEvidenceAction(projectId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["evidence", projectId] });
      },
    });

  return (
    <>
      <h1 className="text-xl font-bold">Evidence</h1>
      {evidence && evidence.length > 0 ? (
        <>
          {evidence.map((evidence) => (
            <div key={evidence.id} className="flex gap-2">
              <Text>{evidence.content}</Text>
              <Button
                size="xs"
                w={rem(100)}
                variant="outline"
                color="red"
                onClick={() => deleteEvidence(evidence.id)}
                loading={isDeletingEvidence}
              >
                Delete
              </Button>
            </div>
          ))}
          <Button
            size="xs"
            w={rem(100)}
            onClick={() => deleteAllEvidence()}
            loading={isDeletingAllEvidence}
          >
            Delete All evidence
          </Button>
        </>
      ) : (
        <div>No evidence</div>
      )}
    </>
  );
}
