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
          attributes: [{ name: "name", type: "string" }],
          elements: [
            {
              name: "ResourcePacks",
              elements: [
                {
                  name: "ResourcePacks",
                  elements: [
                    {
                      name: "ResourcePacks",
                      elements: [
                        {
                          name: "ResourcePacks",
                          elements: [{ name: "ResourcePacks" }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
    </div>
  );
};
