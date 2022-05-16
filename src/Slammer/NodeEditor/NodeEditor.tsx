import React from "react";
import { Stack } from "../../Common/Stack";
import styles from "./NodeEditor.module.css";
import { SlamEditorElement, SlamElementDefinition } from "../SlamXML/slam";
import { StructureElementEditor } from "./Elements/StructureElementEditor";
import { AttributeEditor } from "./Attributes";

export interface NodeEditorProps {
  def?: SlamElementDefinition;
  data: SlamEditorElement;
  index: number[];
}

export const NodeEditor: React.FC<NodeEditorProps> = ({ def, data, index }) => {
  if (!def) {
    return null;
  }

  return (
    <div
      className={styles.editor}
      style={{ "--hue": index.length * 60 } as React.CSSProperties}
    >
      <div className={styles.header}>
        <Stack gap={30} alignment="end" style={{ justifyContent: "start" }}>
          <div className={styles.label}>{data.name}</div>
          {def.attributes?.map((a) => (
            <AttributeEditor key={a.name} attribute={a} index={index} />
          ))}
        </Stack>
      </div>

      {def.elements && (
        <StructureElementEditor
          definitions={def.elements}
          elements={data.elements ?? []}
          index={index}
        />
      )}
    </div>
  );
};
