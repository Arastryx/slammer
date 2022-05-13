import { Input } from "antd";
import React from "react";
import { Stack } from "../../../Stack";
import { SlamAttribute } from "../slam";

export interface StringAttributeProps {
  attribute: SlamAttribute;
}

export const StringAttribute: React.FC<StringAttributeProps> = ({
  attribute,
}) => {
  return (
    <Stack gap={10} alignment="middle" style={{ justifyContent: "start" }}>
      <div>{attribute.name}</div>
      <Input style={{ width: 180 }} size="small" />
    </Stack>
  );
};
