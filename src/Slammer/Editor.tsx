import React, { useEffect, useMemo, useState } from "react";
import styles from "./Editor.module.css";
import { NodeEditor } from "./NodeEditor/NodeEditor";
import { SlamContext } from "./SlamXML";
import {
  SlamEditorElement,
  SlamElementDefinition,
  toEditorData,
  toJsonifiedXML,
  toXML,
} from "./SlamXML/slam";

export interface EditorProps {
  definition: SlamElementDefinition;
}

export const Editor: React.FC<EditorProps> = ({ definition }) => {
  const [editorData, setEditorData] = useState(toEditorData(definition));
  const [data, setData] = useState(toJsonifiedXML(editorData));

  const output = useMemo(
    () => (data ? toXML(data).substring(1) : undefined),
    [data]
  );

  useEffect(() => {
    const editorData = toEditorData(definition);
    setEditorData(editorData);
    setData(toJsonifiedXML(editorData));
  }, [definition]);

  return (
    <div>
      <div className={styles.header}>Slammer</div>
      <SlamContext
        element={definition}
        data={data}
        onDataChange={setData}
        editorData={editorData}
        onEditorChange={setEditorData}
      >
        <NodeEditor def={definition} data={editorData} index={[]} />
      </SlamContext>
      <div>
        <pre className={styles.output}>
          {'<?xml version="1.0" encoding="utf-8"?>\n'}
          {output}
        </pre>
      </div>
    </div>
  );
};
