import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { DefinitionSelector } from "./DefinitionSelector";
import { Editor } from "./Editor/Editor";
import styles from "./Slammer.module.css";
import { SlamElementDefinition } from "./SlamXML/slam";

export interface SlammerProps {
  definitions: SlamElementDefinition[];
}

export const Slammer: React.FC<SlammerProps> = ({ definitions }) => {
  return (
    <div id={styles.slammer}>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<DefinitionSelector definitions={definitions} />}
          ></Route>
          <Route
            path="/editor/:def"
            element={<Editor definitions={definitions} />}
          ></Route>
        </Routes>
      </HashRouter>
    </div>
  );
};
