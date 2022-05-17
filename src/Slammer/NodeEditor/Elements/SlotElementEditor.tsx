import { PlusOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import React from "react";
import { Stack } from "../../../Common/Stack";
import { NodeEditor } from "../NodeEditor";
import { ElementEditorProps } from "./ElementEditor";

export const SlotElementEditor: React.FC<ElementEditorProps> = ({
  elements,
  definitions,
  index,
  onAdd,
}) => {
  return (
    <Stack direction="vertical" gap={10}>
      {elements.length > 0 && (
        <NodeEditor
          key={elements[0].id}
          data={elements[0]}
          def={definitions.find((d) => d.name === elements[0].name)}
          index={index.concat(0)}
        />
      )}
      {elements.length === 0 && (
        <Select
          size="large"
          placeholder={"Set element"}
          value={null}
          onSelect={(v: string | null) =>
            onAdd && onAdd(definitions.find((d) => d.name === v)!)
          }
        >
          {definitions.map((d) => (
            <Select.Option key={d.name} value={d.name}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Stack>
  );
};
