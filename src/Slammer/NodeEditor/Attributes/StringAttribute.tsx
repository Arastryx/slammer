import { Input } from "antd";
import React, { useMemo } from "react";
import { Stack } from "../../../Common/Stack";
import {
  SlamAttributeDefinition,
  SlamEditorStringAttribute,
} from "../../SlamXML/slam";
import { useSlamContext } from "../../SlamXML/SlamContext";
import styles from "./StringAttribute.module.css";

export interface StringAttributeProps {
  attribute: SlamAttributeDefinition;
}

export const StringAttribute: React.FC<StringAttributeProps> = ({
  attribute,
}) => {
  const { getAttribute, setAttribute } = useSlamContext();

  const attributeData = useMemo(
    () => getAttribute(attribute.name) as SlamEditorStringAttribute | undefined,
    [attribute.name, getAttribute]
  );

  return (
    <Stack gap={4} alignment="end" style={{ justifyContent: "start" }}>
      <div className={styles.label}>{attribute.name}</div>
      <Input
        style={{ width: 180 }}
        size="small"
        value={attributeData?.value}
        onChange={(v) => setAttribute(attribute.name, v.currentTarget.value)}
      />
    </Stack>
  );
};
