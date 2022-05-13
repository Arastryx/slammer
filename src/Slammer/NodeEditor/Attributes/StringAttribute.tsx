import { Input } from "antd";
import React from "react";
import { Stack } from "../../../Stack";
import { SlamAttribute } from "../slam";
import styles from "./StringAttribute.module.css";

export interface StringAttributeProps {
  attribute: SlamAttribute;
}

export const StringAttribute: React.FC<StringAttributeProps> = ({
  attribute,
}) => {
  return (
    <Stack gap={4} alignment="end" style={{ justifyContent: "start" }}>
      <div className={styles.label}>{attribute.name}</div>
      <Input style={{ width: 180 }} size="small" />
    </Stack>
  );
};
