import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SlamContext } from "../SlamXML";
import {
  SlamElementDefinition,
  toEditorData,
  toJsonifiedXML,
  toXML,
} from "../SlamXML/slam";
import styles from "./Editor.module.css";
import { NodeEditor } from "./NodeEditor/NodeEditor";

export interface EditorProps {
  definitions: SlamElementDefinition[];
}

export const Editor: React.FC<EditorProps> = ({ definitions }) => {
  const { def } = useParams<{ def: string }>();
  const push = useNavigate();

  const definition = definitions.find((d) => d.name === def);

  if (!definition) {
    push("/");
    return null;
  }

  return <InternalEditor definition={definition} />;
};

interface InternalEditorProps {
  definition: SlamElementDefinition;
}

const InternalEditor: React.FC<InternalEditorProps> = ({ definition }) => {
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
