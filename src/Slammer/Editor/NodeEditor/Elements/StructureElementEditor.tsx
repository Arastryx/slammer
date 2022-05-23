import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Stack } from "../../../../Common/Stack";
import {
  SlamEditorElement,
  SlamElementDefinition,
} from "../../../SlamXML/slam";
import { NodeEditor } from "../NodeEditor";
import { ElementEditorProps } from "./ElementEditor";

interface OptionalElementProps {
  definition: SlamElementDefinition;
  element?: SlamEditorElement;
  index: number[];
  onAdd?: () => void;
}

const OptionalElement: React.FC<OptionalElementProps> = ({
  definition,
  element,
  index,
  onAdd,
}) => {
  if (element) {
    return <NodeEditor def={definition} data={element} index={index} />;
  } else {
    return (
      <Button icon={<PlusOutlined />} size="large" onClick={onAdd}>
        {definition.name}
      </Button>
    );
  }
};

export const StructureElementEditor: React.FC<ElementEditorProps> = ({
  elements,
  definitions,
  index,
  onAdd,
}) => {
  return (
    <Stack direction="vertical" gap={10}>
      {definitions.map((def) => {
        const eleIndex = elements.findIndex((e) => e.name === def.name);

        return (
          <OptionalElement
            key={def.name}
            definition={def}
            element={eleIndex !== -1 ? elements[eleIndex] : undefined}
            index={index.concat(eleIndex)}
            onAdd={() => onAdd && onAdd(def)}
          />
        );
      })}
    </Stack>
  );
};
