import { Input, Switch } from "antd";
import React from "react";
import { Stack } from "../../../Common/Stack";
import { useSlamAttribute } from "../../SlamXML/SlamContext";
import { AttributeEditorProps } from "./attributeEditorProps";
import styles from "./AttributeEditor.module.css";

export const BoolAttribute: React.FC<AttributeEditorProps> = ({
  attribute,
  index,
}) => {
  const [value, setValue] = useSlamAttribute<boolean>(index, attribute.name);

  return (
    <Stack gap={4} alignment="end" style={{ justifyContent: "start" }}>
      <div className={styles.label}>{attribute.name}</div>
      <Switch checked={value} onChange={(v) => setValue(v)} />
    </Stack>
  );
};
