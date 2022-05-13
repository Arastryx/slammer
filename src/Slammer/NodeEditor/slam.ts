export type AttributeType = "string" | "number" | "boolean";

export interface SlamAttribute {
  name: string;
  type: AttributeType;
}

export interface SlamElement {
  name: string;
  attributes?: SlamAttribute[];
  elements?: SlamElement[];
}
