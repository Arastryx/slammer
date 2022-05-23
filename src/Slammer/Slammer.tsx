import React, { useState } from "react";
import { DefinitionSelector } from "./DefinitionSelector";
import { Editor } from "./Editor";
import styles from "./Slammer.module.css";
import { SlamElementDefinition } from "./SlamXML/slam";

export interface SlammerProps {
  definitions: SlamElementDefinition[];
}

export const Slammer: React.FC<SlammerProps> = ({ definitions }) => {
  const [currentDef, setCurrentDef] = useState<string>();
  const targetDef = definitions.find((d) => d.name === currentDef);

  if (!targetDef) {
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
      <Editor definition={targetDef} />
    </div>
  );
};
