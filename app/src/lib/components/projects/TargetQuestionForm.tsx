import { useState, useEffect } from "react";
import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Project, ProjectId } from "@/lib/db/types";
import { notifications } from "@mantine/notifications";
import { TaskNames } from "@/lib/db/tasks";
import { useTasks } from "@/lib/hooks/useTasks";
import { getProjectAction, updateProjectAction } from "@/lib/actions/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface TargetQuestionFormProps {
  projectId: ProjectId;
}

const TargetQuestionForm: React.FC<TargetQuestionFormProps> = ({
  projectId,
}) => {
  const queryClient = useQueryClient();
  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectAction(projectId),
  });

  const updateProjectMutation = useMutation({
    mutationFn: async (data: Partial<Project>) => {
      await updateProjectAction(projectId, data);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onSuccess: () => {
      notifications.show({
        title: "Project data updated",
        message: "Your project data has been updated.",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error updating project data",
        message:
          "There was an error updating your project data. Error: " +
          error.message,
        color: "red",
      });
    },
  });

  if (!project) {
    return null;
  }

  const content = project.content;

  const [opened, { open, close }] = useDisclosure(false);
  const [targetQuestion, setTargetQuestion] = useState(content.targetQuestion);
  const { spawnTask } = useTasks(projectId);

  useEffect(() => {
    if (!content.targetQuestion) {
      open();
    }
  }, [content.targetQuestion]);

  const spawnPostQuestionProcessing = () => {
    spawnTask(TaskNames.IMPROVE_QUESTION, [
      { question: targetQuestion, otherArg: "otherArg" },
    ]);
    spawnTask(TaskNames.VALIDATE_QUESTION, [{ question: targetQuestion }]);
    notifications.show({
      title: "Checking if we can improve the question",
      message: "We will let you know if we can improve the question.",
    });
    setTimeout(() => {
      notifications.show({
        title: "Validating question",
        message: "We are validating if the question is specific enough.",
      });
    }, 3000);
  };

  const handleSubmit = (question: string) => {
    updateProjectMutation.mutate({
      content: {
        ...content,
        targetQuestion: question,
      },
    });
    close();
    spawnPostQuestionProcessing();
  };

  const handleCancel = () => {
    updateProjectMutation.mutate({
      content: {
        ...content,
        targetQuestion: "",
      },
    });
    close();
  };

  return (
    <div>
      {content.targetQuestion !== null && content.targetQuestion !== "" && (
        <div className="flex flex-row gap-2">
          <span className="font-bold">Target Question:</span>
          <span>{content.targetQuestion}</span>
          <Button onClick={open}>Edit Question</Button>
        </div>
      )}

      <Modal opened={opened} onClose={handleCancel} title="Set Target Question">
        <TextInput
          placeholder="Enter your target question"
          value={targetQuestion}
          onChange={(e) => setTargetQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(targetQuestion);
            }
          }}
        />
        <div className="flex gap-2 mt-2">
          <Button onClick={() => handleSubmit(targetQuestion)}>Submit</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TargetQuestionForm;
