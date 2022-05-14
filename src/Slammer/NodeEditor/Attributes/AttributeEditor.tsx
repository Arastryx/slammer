import React from "react";
import { AttributeEditorProps } from "./attributeEditorProps";
import { BoolAttribute } from "./BoolAttribute";
import { NumberAttribute } from "./NumberAttribute";
import { StringAttribute } from "./StringAttribute";

export const AttributeEditor: React.FC<AttributeEditorProps> = (props) => {
  switch (props.attribute.type) {
    case "string":
      return <StringAttribute {...props} />;
    case "number":
      return <NumberAttribute {...props} />;
    case "boolean":
      return <BoolAttribute {...props} />;
  }
};
