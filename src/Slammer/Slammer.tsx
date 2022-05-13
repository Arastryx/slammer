import { Button } from "antd";
import React from "react";
import { NodeEditor } from "./NodeEditor/NodeEditor";
import styles from "./Slammer.module.css";
const XMLMapping = require("xml-mapping");

export interface SlammerProps {}

export const Slammer: React.FC<SlammerProps> = ({}) => {
  const testXml = () => {
    const what = XMLMapping.load('<hello test="wow" number="52"/>');
    const test = XMLMapping.dump(
      { x: { y: { cool: "yes", number: 20, bool: true } } },
      { header: true }
    );
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
