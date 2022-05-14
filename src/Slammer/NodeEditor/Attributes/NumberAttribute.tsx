import { Input, InputNumber } from "antd";
import React from "react";
import { Stack } from "../../../Common/Stack";
import { useSlamAttribute } from "../../SlamXML/SlamContext";
import { AttributeEditorProps } from "./attributeEditorProps";
import styles from "./AttributeEditor.module.css";

export const NumberAttribute: React.FC<AttributeEditorProps> = ({
  attribute,
  index,
}) => {
  const [value, setValue] = useSlamAttribute<number>(index, attribute.name);

  return (
    <Stack gap={4} alignment="end" style={{ justifyContent: "start" }}>
      <div className={styles.label}>{attribute.name}</div>
      <InputNumber size="small" value={value} onChange={(v) => setValue(v)} />
    </Stack>
  );
};
