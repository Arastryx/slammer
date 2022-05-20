import { Button } from "antd";
import React from "react";
import { Stack } from "../Common/Stack";
import { SlamElementDefinition } from "./SlamXML/slam";
import styles from "./DefinitionSelector.module.css";
import { PlusOutlined } from "@ant-design/icons";

export interface DefinitionSelectorProps {
  definitions: SlamElementDefinition[];
  onSelect: (definitionName: string) => void;
}

export const DefinitionSelector: React.FC<DefinitionSelectorProps> = ({
  definitions,
  onSelect,
}) => {
  return (
    <div>
      <div className={styles.header}>Select a file type</div>
      <Stack direction="vertical" gap={20}>
        {definitions.map((d) => (
          <Button
            key={d.name}
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => onSelect(d.name)}
          >
            {d.name}
          </Button>
        ))}
      </Stack>
    </div>
  );
};
