import React, { useState } from "react";
import { Stack } from "../../Common/Stack";
import styles from "./NodeEditor.module.css";
import { SlamEditorElement, SlamElementDefinition } from "../SlamXML/slam";
import { StructureElementEditor } from "./Elements/StructureElementEditor";
import { AttributeEditor } from "./Attributes";
import { useSlamElement } from "../SlamXML/SlamContext";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import Collapse from "@kunukn/react-collapse";

export interface NodeEditorProps {
  def?: SlamElementDefinition;
  data: SlamEditorElement;
  index: number[];
}

export const NodeEditor: React.FC<NodeEditorProps> = ({ def, data, index }) => {
  const [open, setOpen] = useState(true);
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
        <Stack gap={10} fill alignment="middle">
          {def.elements && def.elements.length > 0 && (
            <div className={styles.button} onClick={() => setOpen(!open)}>
              <RightOutlined
                rotate={open ? 90 : 0}
                style={{
                  color: `hsl(${index.length * 60}, 100%, 23%)`,
                }}
              />
            </div>
          )}

          <Stack gap={30} alignment="end">
            <div className={styles.label}>{data.name}</div>
            {def.attributes?.map((a) => (
              <AttributeEditor key={a.name} attribute={a} index={index} />
            ))}
          </Stack>
          {!def.required && index.length !== 0 && (
            <div className={styles.button} onClick={remove}>
              <CloseOutlined
                style={{ color: `hsl(${index.length * 60}, 100%, 23%)` }}
              />
            </div>
          )}
        </Stack>
      </div>

      <Collapse isOpen={open}>
        {def.elements && (
          <StructureElementEditor
            definitions={def.elements}
            elements={data.elements ?? []}
            index={index}
            onAdd={addElement}
          />
        )}
      </Collapse>
    </div>
  );
};
