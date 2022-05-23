import { Button } from "antd";
import React from "react";
import { Stack } from "../Common/Stack";
import { SlamElementDefinition } from "./SlamXML/slam";
import styles from "./DefinitionSelector.module.css";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export interface DefinitionSelectorProps {
  definitions: SlamElementDefinition[];
}

export const DefinitionSelector: React.FC<DefinitionSelectorProps> = ({
  definitions,
}) => {
  return (
    <div>
      <div className={styles.header}>Select a file type</div>
      <Stack direction="vertical" gap={20}>
        {definitions.map((d) => (
          <Link key={d.name} to={`/editor/${d.name}`}>
            <Button type="primary" size="large" icon={<PlusOutlined />}>
              {d.name}
            </Button>
          </Link>
        ))}
      </Stack>
    </div>
  );
};
