import React from "react";
import { NodeEditor } from "./NodeEditor/NodeEditor";
import styles from "./Slammer.module.css";

export interface SlammerProps {}

export const Slammer: React.FC<SlammerProps> = ({}) => {
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
    </div>
  );
};
