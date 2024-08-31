import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Content, ProjectId } from "@/lib/db/types";
import { notifications } from "@mantine/notifications";
import { TaskNames } from "@/lib/db/tasks";
import { useTasks } from "@/lib/hooks/useTasks";

interface TargetQuestionFormProps {
  projectId: ProjectId;
  content: Content;
  setContent: Dispatch<SetStateAction<Content>>;
}

const TargetQuestionForm: React.FC<TargetQuestionFormProps> = ({
  projectId,
  content,
  setContent,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [targetQuestion, setTargetQuestion] = useState(content.targetQuestion);
  const { spawnTask } = useTasks(projectId);

  useEffect(() => {
    if (content.targetQuestion === null) {
      open();
    }
  }, [content.targetQuestion]);

  const spawnPostQuestionProcessing = () => {
    spawnTask(TaskNames.IMPROVE_QUESTION, [{ question: targetQuestion }]);
    notifications.show({
      title: "Checking if we can improve the question",
      message: "We will let you know if we can improve the question.",
    });
  };

  const handleSubmit = (question: string) => {
    setContent((prevContent) => {
      const newContent = {
        ...prevContent,
        targetQuestion: question,
      };
      return newContent;
    });
    close();
    notifications.show({
      title: "Target Question Updated",
      message: "Your target question has been updated.",
    });
    spawnPostQuestionProcessing();
  };

  const handleCancel = () => {
    setContent((prevContent) => ({
      ...prevContent,
      targetQuestion: "",
    }));
    close();
  };

  return (
    <div>
      {content.targetQuestion !== null && content.targetQuestion !== "" && (
        <div>
          <h3>Target Question:</h3>
          <p>{content.targetQuestion}</p>
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
        <Button onClick={() => handleSubmit(targetQuestion)}>Submit</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default TargetQuestionForm;
