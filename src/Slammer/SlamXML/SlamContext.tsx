import cloneDeep from "clone-deep";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDebouncedEffect } from "../../Common/useDebouncedEffect";
import {
  build,
  SlamEditorAttribute,
  SlamEditorElement,
  SlamElementDefinition,
  toJsonifiedXML,
} from "./slam";

export interface SlamContextData {
  getElement: () => SlamEditorElement | undefined;
  getAttribute: (name: string) => SlamEditorAttribute | undefined;
  setAttribute: (name: string, value?: string | number | boolean) => void;
}

const SlamContextContext = createContext<SlamContextData | null>(null);

export interface SlamContextProps {
  children?: React.ReactNode;
  element: SlamElementDefinition;
  data?: any;
  onChange?: (data?: any) => void;
}

export const SlamContext: React.FC<SlamContextProps> = ({
  children,
  element,
  data,
  onChange,
}) => {
  const [editorData, setEditorData] = useState<SlamEditorElement>();

  const getElement = useCallback(() => {
    return editorData;
  }, [editorData]);

  const getAttribute = useCallback(
    (name: string) => {
      return editorData;
    },
    [editorData]
  );

  const setAttribute = useCallback(
    (name: string, value?: string | number | boolean) => {
      const element = cloneDeep(editorData);
      const attribute = element?.attributes?.find((a) => a.name === name);

      if (attribute) {
        attribute.value = value;
        setEditorData(element);
      }
    },
    [editorData]
  );

  useEffect(() => {
    setEditorData(build(element));
  }, [element]);

  useDebouncedEffect(
    () => {
      if (editorData && onChange) {
        onChange(toJsonifiedXML(editorData));
      }
    },
    300,
    [editorData]
  );

  return (
    <SlamContextContext.Provider
      value={{ getElement, getAttribute, setAttribute }}
    >
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
