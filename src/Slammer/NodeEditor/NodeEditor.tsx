import React from "react";
import { Stack } from "../../Common/Stack";
import { StringAttribute } from "./Attributes/StringAttribute";
import styles from "./NodeEditor.module.css";
import { SlamEditorElement, SlamElementDefinition } from "../SlamXML/slam";

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
        <Stack gap={20} alignment="end" style={{ justifyContent: "start" }}>
          <div className={styles.label}>{data.name}</div>
          {def.attributes?.map((a) => (
            <StringAttribute key={a.name} attribute={a} index={index} />
          ))}
        </Stack>
      </div>

      {data.elements?.map((dataElement, i) => (
        <NodeEditor
          key={dataElement.id}
          def={def.elements?.find((e) => e.name === dataElement.name)}
          data={dataElement}
          index={index.concat(i)}
        />
      ))}
    </div>
  );
};
