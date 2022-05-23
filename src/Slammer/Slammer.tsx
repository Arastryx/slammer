import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Editor } from "./Editor/Editor";
import styles from "./Slammer.module.css";
import { SlamElementDefinition } from "./SlamXML/slam";
import { DefinitionImporter } from "./DefinitionImporter";

export interface SlammerProps {
  definitions: SlamElementDefinition[];
}

export const Slammer: React.FC<SlammerProps> = ({ definitions }) => {
  return (
    <div id={styles.slammer}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home definitions={definitions} />} />
          <Route path="/import-def" element={<DefinitionImporter />} />
          <Route
            path="/editor/:def"
            element={<Editor definitions={definitions} />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
};
