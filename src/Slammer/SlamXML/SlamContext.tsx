import React, { createContext, useContext, useEffect, useState } from "react";
import { JsonifiedXML } from "./jsonifiedXml";
import { SlamElement } from "./slam";
import { SlamElementManager } from "./SlamElementManager";

export interface SlamContextData {
  data?: JsonifiedXML;
}

const SlamContextContext = createContext<SlamContextData | null>(null);

export interface SlamContextProps {
  children?: React.ReactNode;
  element: SlamElement;
  data?: JsonifiedXML;
  onChange?: (data?: JsonifiedXML) => void;
}

export const SlamContext: React.FC<SlamContextProps> = ({
  children,
  element,
  data,
  onChange,
}) => {
  useEffect(() => {
    const elementManager = new SlamElementManager(element);
    onChange && onChange(elementManager.toJsonifiedXML());
  }, [element, onChange]);

  return (
    <SlamContextContext.Provider value={{ data }}>
      {children}
    </SlamContextContext.Provider>
  );
};

export function useSlamContext() {
  const result = useContext(SlamContextContext);

  if (result === null) {
    throw new Error(
      "useSlamContext() cannot be used without being wrapped by a SlamContext"
    );
  }

  return result;
}
