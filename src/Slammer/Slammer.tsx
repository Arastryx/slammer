import React from "react";
import styles from "./Slammer.module.css";

export interface SlammerProps {}

export const Slammer: React.FC<SlammerProps> = ({}) => {
  return <div id={styles.slammer}>Hello World</div>;
};
