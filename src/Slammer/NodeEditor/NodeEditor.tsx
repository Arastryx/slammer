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
      <h1>{slam.name}</h1>
      <Stack gap={20} style={{ padding: 10 }}>
        {slam.attributes?.map((a) => (
          <StringAttribute attribute={a} />
        ))}
      </Stack>

      {slam.elements?.map((e) => (
        <NodeEditor slam={e} depth={depth + 1} />
      ))}
    </div>
  );
};
