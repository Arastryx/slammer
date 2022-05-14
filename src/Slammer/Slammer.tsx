import { XMLBuilder, XMLParser } from "fast-xml-parser";
import React, { useMemo, useState } from "react";
import { JsonifiedXML } from "./SlamXML/jsonifiedXml";
import { NodeEditor } from "./NodeEditor/NodeEditor";
import styles from "./Slammer.module.css";
import { SlamContext, SlamElement } from "./SlamXML";

// const parser = new XMLParser({
//   parseAttributeValue: true,
//   ignoreAttributes: false,
//   preserveOrder: true,
//   attributeNamePrefix: "",
// });

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
};

export const Slammer: React.FC<SlammerProps> = ({}) => {
  const [data, setData] = useState<JsonifiedXML>();

  const output = useMemo(
    () => (builder.build([data]) as string).substring(1),
    [data]
  );

  return (
    <div id={styles.slammer}>
      <SlamContext element={slamElement} data={data} onChange={setData}>
        <NodeEditor slam={slamElement} />
      </SlamContext>

      <pre className={styles.output}>
        {'<?xml version="1.0" encoding="utf-8"?>\n'}
        {output}
      </pre>
    </div>
  );
};
