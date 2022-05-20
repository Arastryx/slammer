import { XMLBuilder, XMLParser } from "fast-xml-parser";
import React, { useEffect, useMemo, useState } from "react";
import { DefinitionSelector } from "./DefinitionSelector";
import { NodeEditor } from "./NodeEditor/NodeEditor";
import styles from "./Slammer.module.css";
import { SlamContext, SlamElement } from "./SlamXML";
import {
  build,
  SlamEditorElement,
  SlamElementDefinition,
  toJsonifiedXML,
} from "./SlamXML/slam";

// const parser = new XMLParser({
//   parseAttributeValue: true,
//   ignoreAttributes: false,
//   preserveOrder: true,
//   attributeNamePrefix: "",
// });

// const test = parser.parse(
//   '<Character cool="Test" thing="otherTest"><Moves></Moves></Character>'
// );
// console.log("proper:", test);

const builder = new XMLBuilder({
  preserveOrder: true,
  ignoreAttributes: false,
  suppressEmptyNode: true,
  attributeNamePrefix: "",
  suppressBooleanAttributes: false,
  format: true,
});

export interface SlammerProps {
  definitions: SlamElementDefinition[];
}

export const Slammer: React.FC<SlammerProps> = ({ definitions }) => {
  const [currentDef, setCurrentDef] = useState<string>();

  const [editorData, setEditorData] = useState<SlamEditorElement>();
  const [data, setData] = useState<any>();

  const output = useMemo(
    () => (data ? (builder.build([data]) as string).substring(1) : undefined),
    [data]
  );

  useEffect(() => {
    const targetDef = definitions.find((d) => d.name === currentDef);

    if (targetDef) {
      const editorData = build(targetDef);
      setEditorData(editorData);
      setData(toJsonifiedXML(editorData));
    } else {
      setEditorData(undefined);
      setData(undefined);
    }
  }, [currentDef, definitions]);

  const targetDef = definitions.find((d) => d.name === currentDef);

  if (!targetDef || !editorData || !data) {
    return (
      <div id={styles.slammer}>
        <DefinitionSelector
          definitions={definitions}
          onSelect={setCurrentDef}
        />
      </div>
    );
  }

  return (
    <div id={styles.slammer}>
      <div className={styles.header}>Slammer</div>
      <SlamContext
        element={targetDef}
        data={data}
        onDataChange={setData}
        editorData={editorData}
        onEditorChange={setEditorData}
      >
        <NodeEditor def={targetDef} data={editorData} index={[]} />
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
