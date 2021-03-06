import { Input } from "antd";
import React from "react";
import { Stack } from "../../../../Common/Stack";
import { useSlamAttribute } from "../../../SlamXML/SlamContext";
import { AttributeEditorProps } from "./attributeEditorProps";
import styles from "./AttributeEditor.module.css";

export const StringAttribute: React.FC<AttributeEditorProps> = ({
  attribute,
  index,
}) => {
  const [value, setValue] = useSlamAttribute<string>(index, attribute.name);

  return (
    <Stack gap={4} alignment="end" style={{ justifyContent: "start" }}>
      <div className={styles.label}>{attribute.name}</div>
      <Input
        style={{ width: 180 }}
        size="small"
        value={value}
        onChange={(v) => setValue(v.currentTarget.value)}
      />
    </Stack>
  );
};
