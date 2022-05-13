import { Button } from "antd";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import React from "react";
import { NodeEditor } from "./NodeEditor/NodeEditor";
import styles from "./Slammer.module.css";

export interface SlammerProps {}

export const Slammer: React.FC<SlammerProps> = ({}) => {
  const testXml = () => {
    const parser = new XMLParser({
      parseAttributeValue: true,
      ignoreAttributes: false,
      preserveOrder: true,
      attributeNamePrefix: "",
    });
    const what = parser.parse(
      '<Character also="this" number="52" bool="true"><Action thing="wow"/><Cool test="please"/><Action thing="what"/></Character>'
    );

    const builder = new XMLBuilder({
      preserveOrder: true,
      ignoreAttributes: false,
      suppressEmptyNode: true,
      attributeNamePrefix: "",
      suppressBooleanAttributes: false,
    });
    const test = builder.build(what);
    const b = 0;
  };

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
      <Button id={styles.slam} type="primary" block onClick={testXml}>
        SLAM
      </Button>
    </div>
  );
};
