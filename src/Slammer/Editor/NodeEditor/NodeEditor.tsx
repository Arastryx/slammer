import React, { useState } from "react";
import { Stack } from "../../../Common/Stack";
import styles from "./NodeEditor.module.css";
import {
  SlamEditorElement,
  SlamNestedElementDefinition,
} from "../../SlamXML/slam";
import { AttributeEditor } from "./Attributes";
import { useSlamElement } from "../../SlamXML/SlamContext";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import Collapse from "@kunukn/react-collapse";
import { ElementEditor } from "./Elements";
import TextArea from "antd/lib/input/TextArea";

export interface NodeEditorProps {
  def?: SlamNestedElementDefinition;
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
        <Stack gap="apart" fill alignment="middle">
          <Stack
            gap={10}
            fill
            alignment="middle"
            style={{ justifyContent: "start", marginRight: 30 }}
          >
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

      {def.elements && (
        <div className={styles.body}>
          <Collapse isOpen={open}>
            <ElementEditor
              type={def.type}
              definitions={def.elements}
              elements={Array.isArray(data.elements) ? data.elements : []}
              index={index}
              onAdd={addElement}
            />
          </Collapse>
        </div>
      )}
      {def.type === "text" && <TextArea style={{ minWidth: 300 }}></TextArea>}
    </div>
  );
};
