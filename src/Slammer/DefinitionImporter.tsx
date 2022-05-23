import { ArrowRightOutlined, ArrowsAltOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { Stack } from "../Common/Stack";
import { useDebouncedEffect } from "../Common/useDebouncedEffect";
import styles from "./DefinitionImporter.module.css";
import { toDefinition } from "./SlamXML/slam";

export interface DefinitionImporterProps {}

export const DefinitionImporter: React.FC<DefinitionImporterProps> = ({}) => {
  const [xml, setXML] = useState("");
  const [output, setOutput] = useState("");

  useDebouncedEffect(
    () => {
      const result = toDefinition(xml);
      setOutput(
        typeof result === "string" ? result : JSON.stringify(result, null, 2)
      );
    },
    300,
    [xml]
  );

  return (
    <Stack gap={20} alignment="middle" stretch>
      <Stack.Item>
        <TextArea
          rows={20}
          value={xml}
          onChange={(e) => setXML(e.currentTarget.value)}
        />
      </Stack.Item>
      <Stack alignment="middle">
        <ArrowRightOutlined style={{ fontSize: 30, color: "white" }} />
      </Stack>
      <Stack.Item>
        <pre className={styles.output}>{output}</pre>
      </Stack.Item>
    </Stack>
  );
};
