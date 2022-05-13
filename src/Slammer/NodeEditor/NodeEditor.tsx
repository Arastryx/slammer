import React from "react";
import { Stack } from "../../Stack";
import { StringAttribute } from "./Attributes/StringAttribute";
import styles from "./NodeEditor.module.css";
import { SlamElement } from "./slam";

export interface NodeEditorProps {
  slam: SlamElement;
  depth?: number;
}

export const NodeEditor: React.FC<NodeEditorProps> = ({ slam, depth = 0 }) => {
  return (
    <div
      className={styles.editor}
      style={{ "--hue": depth * 60 } as React.CSSProperties}
    >
      <div className={styles.header}>
        <Stack gap={20} alignment="end" style={{ justifyContent: "start" }}>
          <div className={styles.label}>{slam.name}</div>
          {slam.attributes?.map((a) => (
            <StringAttribute attribute={a} />
          ))}
        </Stack>
      </div>

      {slam.elements?.map((e) => (
        <NodeEditor slam={e} depth={depth + 1} />
      ))}
    </div>
  );
};
