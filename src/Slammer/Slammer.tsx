import { XMLBuilder, XMLParser } from "fast-xml-parser";
import React, { useMemo } from "react";
import { JsonifiedXML } from "./jsonifiedXml";
import { NodeEditor } from "./NodeEditor/NodeEditor";
import styles from "./Slammer.module.css";

const parser = new XMLParser({
  parseAttributeValue: true,
  ignoreAttributes: false,
  preserveOrder: true,
  attributeNamePrefix: "",
});

const builder = new XMLBuilder({
  preserveOrder: true,
  ignoreAttributes: false,
  suppressEmptyNode: true,
  attributeNamePrefix: "",
  suppressBooleanAttributes: false,
  format: true,
});

const test: JsonifiedXML[] = parser.parse(
  '<Test value="cool"><Inner value="52"/></Test>'
);

export interface SlammerProps {}

export const Slammer: React.FC<SlammerProps> = ({}) => {
  const output = useMemo(
    () => (builder.build(test) as string).substring(1),
    []
  );

  return (
    <div id={styles.slammer}>
      <NodeEditor
        slam={{
          name: "Character",
          attributes: [
            { name: "name", type: "string" },
            { name: "otherThing", type: "string" },
          ],
          elements: [
            {
              name: "Coolness",
              attributes: [{ name: "wow", type: "string" }],
            },
          ],
        }}
      />
      <pre className={styles.output}>
        {'<?xml version="1.0" encoding="utf-8"?>\n'}
        {output}
      </pre>
    </div>
  );
};
