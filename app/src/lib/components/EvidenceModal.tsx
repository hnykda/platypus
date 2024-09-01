"use client";

import { Button, Text, Switch, List } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useState } from "react";

export const EvidenceModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  modalBody: string;
  result: { evidence: string[] };
}>) => {
  const [selectedEvidence, setSelectedEvidence] = useState<boolean[]>(
    new Array(innerProps.result.evidence.length).fill(true)
  );

  const handleSwitchChange = (index: number) => {
    setSelectedEvidence((prev) => {
      const newSelected = [...prev];
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  };

  const handleAddSelected = () => {
    const selected = innerProps.result.evidence.filter(
      (_, index) => selectedEvidence[index]
    );
    console.log("Selected evidence:", selected);
    // context.closeModal(id);
  };

  return (
    <>
      <Text size="sm">{innerProps.modalBody}</Text>
      <Text>
        We found the following evidence, do you want to add it to your overall
        registry?
      </Text>
      <List>
        {innerProps.result.evidence.map((item, index) => (
          <List.Item key={index}>
            <Switch
              checked={selectedEvidence[index]}
              onChange={() => handleSwitchChange(index)}
              label={item}
            />
          </List.Item>
        ))}
      </List>
      <Button onClick={handleAddSelected}>Add selected evidence</Button>
      <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
        Close modal
      </Button>
    </>
  );
};
