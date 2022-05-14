import { XMLBuilder, XMLParser } from "fast-xml-parser";
import React, { useMemo, useState } from "react";
import { NodeEditor } from "./NodeEditor/NodeEditor";
import styles from "./Slammer.module.css";
import { SlamContext, SlamElement } from "./SlamXML";
import { build, SlamEditorElement, toJsonifiedXML } from "./SlamXML/slam";

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

export interface SlammerProps {}

const slamElement: SlamElement = {
  name: "Character",
  attributes: [
    { name: "cool", type: "string" },
    { name: "num", type: "number" },
    { name: "bool", type: "boolean" },
  ],
  elements: [
    {
      name: "Moves",
      attributes: [{ name: "theBigTest", type: "string" }],
    },
  ],
};

export const Slammer: React.FC<SlammerProps> = ({}) => {
  const [editorData, setEditorData] = useState<SlamEditorElement>(
    build(slamElement)
  );
  const [data, setData] = useState(toJsonifiedXML(editorData));

  const output = useMemo(
    () => (data ? (builder.build([data]) as string).substring(1) : undefined),
    [data]
  );

  return (
    <div id={styles.slammer}>
      <SlamContext
        element={slamElement}
        data={data}
        onDataChange={setData}
        editorData={editorData}
        onEditorChange={setEditorData}
      >
        <NodeEditor def={slamElement} data={editorData} index={[]} />
      </SlamContext>

      <pre className={styles.output}>
        {'<?xml version="1.0" encoding="utf-8"?>\n'}
        {output}
      </pre>
    </div>
  );
};
