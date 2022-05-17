import { PlusOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import React from "react";
import { Stack } from "../../../Common/Stack";
import { NodeEditor } from "../NodeEditor";
import { ElementEditorProps } from "./ElementEditor";

export const ListingElementEditor: React.FC<ElementEditorProps> = ({
  elements,
  definitions,
  index,
  onAdd,
}) => {
  return (
    <Stack direction="vertical" gap={10}>
      {elements.map((e, i) => (
        <NodeEditor
          key={e.id}
          data={e}
          def={definitions.find((d) => d.name === e.name)}
          index={index.concat(i)}
        />
      ))}

      {definitions.length === 1 && (
        <Button
          icon={<PlusOutlined />}
          size="large"
          onClick={() => onAdd && onAdd(definitions[0])}
        >
          {definitions[0].name}
        </Button>
      )}
      {definitions.length > 1 && (
        <Select
          size="large"
          placeholder={"Add an element"}
          value={null}
          onSelect={(v: string | null) =>
            onAdd && onAdd(definitions.find((d) => d.name === v)!)
          }
        >
          {definitions.map((d) => (
            <Select.Option key={d.name} value={d.name}>
              <PlusOutlined /> {d.name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Stack>
  );
};
