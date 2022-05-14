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
  id: number;
  attributes?: SlamEditorAttribute[];
  elements?: SlamEditorElement[];
}

let idCounter = 1;

function getId() {
  return idCounter++;
}

export function build(def: SlamElementDefinition): SlamEditorElement {
  return {
    name: def.name,
    id: getId(),
    attributes: def.attributes?.map((a) => ({
      name: a.name,
      value: "",
    })),
    elements: def.elements?.map((e) => build(e)),
  };
}

export function toJsonifiedXML(element: SlamEditorElement): any {
  return {
    [element.name]: element.elements?.map((e) => toJsonifiedXML(e)) ?? [],
    ":@": Object.fromEntries(
      element.attributes
        ?.filter((a) => a.value)
        .map((a) => [a.name, a.value]) ?? []
    ),
  };
}
