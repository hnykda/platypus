"use client";

import {
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  rem,
  Notification,
  ScrollArea,
} from "@mantine/core";
import {
  IconBulb,
  IconSearch,
} from "@tabler/icons-react";
import classes from "./ActionBar.module.css";
import { TaskStatus } from "@/lib/db/types";
import { useTasks } from "@/lib/hooks/useTasks";

const links = [{ icon: IconBulb, label: "Improve Question", notifications: 3 }];

export function ActionBar({ projectId }: { projectId: string }) {
  const { projectTasks } = useTasks(projectId);

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
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
          <ScrollArea mt="md">
            {projectTasks.map((task) => (
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
