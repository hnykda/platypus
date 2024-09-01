"use client";

import {
  TextInput,
  Code,
  UnstyledButton,
  Text,
  rem,
  Notification,
  ScrollArea,
  Button,
} from "@mantine/core";
import { IconBulb, IconSearch } from "@tabler/icons-react";
import classes from "./ActionBar.module.css";
import { TaskStatus } from "@/lib/db/types";
import { useTasks } from "@/lib/hooks/useTasks";
import { TaskNames } from "@/lib/db/tasks";

const links = [
  {
    icon: IconBulb,
    label: "Improve Question",
    taskName: TaskNames.IMPROVE_QUESTION,
  },
  {
    icon: IconSearch,
    label: "Search for Evidence",
    taskName: TaskNames.SEARCH_FOR_EVIDENCE,
  },
];

export function ActionBar({ projectId }: { projectId: string }) {
  const { tasks, deleteAllTasks, spawnTask } = useTasks(projectId);

  const mainLinks = links.map((link) => (
    <UnstyledButton
      key={link.label}
      className={classes.mainLink}
      onClick={() => {
        // this won't work when tasks become more complex and receive more than just one argument
        // but solvable...
        spawnTask(link.taskName, [
          { question: "What is the meaning of life?" },
        ]);
      }}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
    </UnstyledButton>
  ));

  return (
    <>
      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={
          <IconSearch
            style={{ width: rem(12), height: rem(12) }}
            stroke={1.5}
          />
        }
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        styles={{ section: { pointerEvents: "none" } }}
        mb="sm"
      />

      <div className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </div>

      <div className={classes.section}>
        <div className="p-4">
          <Text size="lg" fw={500} mb="md">
            Tasks
          </Text>
          {tasks?.length === 0 ? (
            <Text size="sm" c="dimmed">
              No tasks found
            </Text>
          ) : (
            <Button
              onClick={() => {
                deleteAllTasks();
              }}
            >
              Delete All
            </Button>
          )}
          <ScrollArea mt="md">
            {tasks?.map((task) => (
              <Notification
                key={task.id}
                title={task.task_name}
                color={
                  task.status === TaskStatus.PENDING
                    ? "blue"
                    : task.status === TaskStatus.COMPLETED
                    ? "green"
                    : "red"
                }
                mb="xs"
              >
                Status: {task.status}
              </Notification>
            ))}
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
