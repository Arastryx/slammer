export type AttributeType = "string" | "number" | "boolean";

export interface SlamAttributeDefinition {
  name: string;
  type: AttributeType;
}

export interface SlamElementDefinition {
  name: string;
  attributes?: SlamAttributeDefinition[];
  elements?: SlamElementDefinition[];
}

interface SlamEditorBaseAttribute<T> {
  name: string;
  value?: T;
}

export type SlamEditorStringAttribute = SlamEditorBaseAttribute<string>;
export type SlamEditorNumberAttribute = SlamEditorBaseAttribute<number>;
export type SlamEditorBoolAttribute = SlamEditorBaseAttribute<boolean>;

export type SlamEditorAttribute =
  | SlamEditorStringAttribute
  | SlamEditorNumberAttribute
  | SlamEditorBoolAttribute;

export interface SlamEditorElement {
  name: string;
  attributes?: SlamEditorAttribute[];
  elements?: SlamEditorElement[];
}

export function build(def: SlamElementDefinition): SlamEditorElement {
  return {
    name: def.name,
    attributes: def.attributes?.map((a) => ({
      name: a.name,
      value: "",
    })),
  };
}

export function toJsonifiedXML(element: SlamEditorElement): any {
  return {
    [element.name]: [],
    ":@": Object.fromEntries(
      element.attributes?.map((a) => [a.name, a.value]) ?? []
    ),
  };
}
