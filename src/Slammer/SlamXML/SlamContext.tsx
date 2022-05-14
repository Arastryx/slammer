import cloneDeep from "clone-deep";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDebouncedEffect } from "../../Common/useDebouncedEffect";
import {
  build,
  SlamEditorElement,
  SlamElementDefinition,
  toJsonifiedXML,
} from "./slam";

export interface SlamContextData {
  editorData?: SlamEditorElement;
  setEditorData: React.Dispatch<
    React.SetStateAction<SlamEditorElement | undefined>
  >;
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

  const value = useMemo(() => ({ editorData, setEditorData }), [editorData]);

  return (
    <SlamContextContext.Provider value={value}>
      {children}
    </SlamContextContext.Provider>
  );
};

export function useSlamAttribute<T extends string | number | boolean>(
  name: string
): [T | undefined, (value: T | undefined) => void] {
  const result = useContext(SlamContextContext);

  if (result === null) {
    throw new Error(
      "useSlamContext() cannot be used without being wrapped by a SlamContext"
    );
  }

  const getAttribute = useCallback(
    (name: string) => {
      return result.editorData?.attributes?.find((a) => a.name === name);
    },
    [result.editorData]
  );

  const setAttribute = useCallback(
    (name: string, value?: string | number | boolean) => {
      const element = cloneDeep(result.editorData);
      const attribute = element?.attributes?.find((a) => a.name === name);

      if (attribute) {
        attribute.value = value;
        result.setEditorData(element);
      }
    },
    [result]
  );

  const value = useMemo(
    () => getAttribute(name)?.value as T | undefined,
    [getAttribute, name]
  );
  const setValue = useCallback(
    (value: T | undefined) => setAttribute(name, value),
    [name, setAttribute]
  );

  return [value, setValue];
}
