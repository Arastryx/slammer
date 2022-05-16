import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { SlamEditorElement, SlamElementDefinition } from "../../SlamXML/slam";
import { NodeEditor } from "../NodeEditor";

interface OptionalElementProps {
  definition: SlamElementDefinition;
  element?: SlamEditorElement;
  index: number[];
}

const OptionalElement: React.FC<OptionalElementProps> = ({
  definition,
  element,
  index,
}) => {
  if (element) {
    return <NodeEditor def={definition} data={element} index={index} />;
  } else {
    return (
      <Button icon={<PlusOutlined />} size="large">
        {definition.name}
      </Button>
    );
  }
};

export interface StructureElementEditorProps {
  definitions: SlamElementDefinition[];
  elements: SlamEditorElement[];
  index: number[];
}

export const StructureElementEditor: React.FC<StructureElementEditorProps> = ({
  elements,
  definitions,
  index,
}) => {
  return (
    <>
      {definitions.map((def) => {
        const eleIndex = elements.findIndex((e) => e.name === def.name);

        return (
          <OptionalElement
            key={def.name}
            definition={def}
            element={eleIndex !== -1 ? elements[eleIndex] : undefined}
            index={index.concat(eleIndex)}
          />
        );
      })}
    </>
  );
};
