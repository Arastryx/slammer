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
  editorData: SlamEditorElement;
  onEditorChange?: (data: SlamEditorElement) => void;
}

const SlamContextContext = createContext<SlamContextData | null>(null);

export interface SlamContextProps {
  children?: React.ReactNode;
  element: SlamElementDefinition;
  data?: any;
  editorData: SlamEditorElement;
  onDataChange?: (data?: any) => void;
  onEditorChange?: (data: SlamEditorElement) => void;
}

export const SlamContext: React.FC<SlamContextProps> = ({
  children,
  element,
  data,
  editorData,
  onDataChange,
  onEditorChange,
}) => {
  useEffect(() => {
    onEditorChange && onEditorChange(build(element));
  }, [element, onEditorChange]);

  useDebouncedEffect(
    () => {
      if (editorData && onDataChange) {
        onDataChange(toJsonifiedXML(editorData));
      }
    },
    300,
    [editorData]
  );

  const value = useMemo(
    () => ({ editorData, onEditorChange }),
    [editorData, onEditorChange]
  );

  return (
    <SlamContextContext.Provider value={value}>
      {children}
    </SlamContextContext.Provider>
  );
};

function getElement(
  target: SlamEditorElement,
  index: number[]
): SlamEditorElement {
  return index.length === 0
    ? target
    : getElement(target.elements![index[0]], index.slice(1));
}

export function useSlamAttribute<T extends string | number | boolean>(
  index: number[],
  name: string
): [T | undefined, (value: T | undefined) => void] {
  const result = useContext(SlamContextContext);

  if (result === null) {
    throw new Error(
      "useSlamContext() cannot be used without being wrapped by a SlamContext"
    );
  }

  const value = useMemo(
    () =>
      result.editorData?.attributes?.find((a) => a.name === name)?.value as
        | T
        | undefined,
    [name, result.editorData?.attributes]
  );

  const setValue = useCallback(
    (value: T | undefined) => {
      const element = cloneDeep(result.editorData);
      const attribute = getElement(element, index).attributes?.find(
        (a) => a.name === name
      );

      if (attribute) {
        attribute.value = value;
        result.onEditorChange && result.onEditorChange(element);
      }
    },
    [index, name, result]
  );

  return [value, setValue];
}
