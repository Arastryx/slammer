import React from "react";
import {
  SlamEditorElement,
  SlamElementDefinition,
  SlamElementType,
} from "../../../SlamXML/slam";
import { ListingElementEditor } from "./ListingElementEditor";
import { SlotElementEditor } from "./SlotElementEditor";
import { StructureElementEditor } from "./StructureElementEditor";

export interface ElementEditorProps {
  type?: SlamElementType;
  definitions: SlamElementDefinition[];
  elements: SlamEditorElement[];
  index: number[];
  onAdd?: (def: SlamElementDefinition) => void;
}

export const ElementEditor: React.FC<ElementEditorProps> = ({
  type,
  ...props
}) => {
  switch (type) {
    case "listing":
      return <ListingElementEditor {...props} />;
    case "slot":
      return <SlotElementEditor {...props} />;
    default:
      return <StructureElementEditor {...props} />;
  }
};
