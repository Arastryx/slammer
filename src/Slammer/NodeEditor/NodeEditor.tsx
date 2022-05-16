import React from "react";
import { Stack } from "../../Common/Stack";
import styles from "./NodeEditor.module.css";
import { SlamEditorElement, SlamElementDefinition } from "../SlamXML/slam";
import { StructureElementEditor } from "./Elements/StructureElementEditor";
import { AttributeEditor } from "./Attributes";
import { useSlamElement } from "../SlamXML/SlamContext";
import { CloseOutlined } from "@ant-design/icons";

export interface NodeEditorProps {
  def?: SlamElementDefinition;
  data: SlamEditorElement;
  index: number[];
}

export const NodeEditor: React.FC<NodeEditorProps> = ({ def, data, index }) => {
  const { addElement, remove } = useSlamElement(index);

  if (!def) {
    return null;
  }

  return (
    <div
      className={styles.editor}
      style={{ "--hue": index.length * 60 } as React.CSSProperties}
    >
      <div className={styles.header}>
        <Stack gap="apart" fill alignment="middle">
          <Stack gap={30} alignment="end">
            <div className={styles.label}>{data.name}</div>
            {def.attributes?.map((a) => (
              <AttributeEditor key={a.name} attribute={a} index={index} />
            ))}
          </Stack>
          {!def.required && index.length != 0 && (
            <div className={styles.closeButton} onClick={remove}>
              <CloseOutlined
                style={{ color: `hsl(${index.length * 60}, 100%, 23%)` }}
              />
            </div>
          )}
        </Stack>
      </div>

      {def.elements && (
        <StructureElementEditor
          definitions={def.elements}
          elements={data.elements ?? []}
          index={index}
          onAdd={addElement}
        />
      )}
    </div>
  );
};
