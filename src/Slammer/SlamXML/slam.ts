import { XMLBuilder, XMLParser } from "fast-xml-parser";

export type AttributeType = "string" | "number" | "boolean";

export interface SlamAttributeDefinition {
  name: string;
  type: AttributeType;
}

export type SlamElementType = "structure" | "slot" | "listing" | "text";

interface BaseSlamElement {
  name: string;
  attributes?: SlamAttributeDefinition[];
}

export interface SlamNestedElementDefinition extends BaseSlamElement {
  type?: SlamElementType;
  elements?: SlamElementDefinition[];
  required?: boolean;
}

export interface SlamTextElementDefinition extends BaseSlamElement {
  type: "text";
}

export type SlamElementDefinition =
  | SlamNestedElementDefinition
  | SlamTextElementDefinition;

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
  elements: SlamEditorElement[] | string;
}

let idCounter = 1;

const parser = new XMLParser({
  parseAttributeValue: true,
  ignoreAttributes: false,
  preserveOrder: true,
  attributeNamePrefix: "",
});

const builder = new XMLBuilder({
  preserveOrder: true,
  ignoreAttributes: false,
  suppressEmptyNode: true,
  attributeNamePrefix: "",
  suppressBooleanAttributes: false,
  format: true,
});

function getId() {
  return idCounter++;
}

export function toDefinition(xml: string): SlamElementDefinition | string {
  try {
    return editorDataToDefinition(
      jsonifiedXMLToEditorData(xmlToJsonifiedXML(xml))
    );
  } catch (e) {
    return "Invalid XML: Failed to translate XML into definition.";
  }
}

export function toEditorData(def: SlamElementDefinition): SlamEditorElement {
  return {
    name: def.name,
    id: getId(),
    attributes: def.attributes?.map((a) => ({
      name: a.name,
      value: "",
    })),
    elements:
      def.type === "text"
        ? ""
        : def.elements
            ?.filter((e) => e.type !== "text" && e.required)
            .map((e) => toEditorData(e)) ?? [],
  };
}

export function toJsonifiedXML(element: SlamEditorElement | string): any {
  if (typeof element === "string") {
    return xmlToJsonifiedXML(element);
  } else {
    return editorDataToJsonifiedXML(element);
  }
}

export function toXML(element: any) {
  return jsonifiedXMLToXML(element);
}

function editorDataToJsonifiedXML(data: SlamEditorElement) {
  return {
    [data.name]: Array.isArray(data.elements)
      ? data.elements.map((e) => toJsonifiedXML(e))
      : undefined,
    ":@": Object.fromEntries(
      data.attributes?.filter((a) => a.value).map((a) => [a.name, a.value]) ??
        []
    ),
    "#text": typeof data.elements === "string" ? data.elements : undefined,
  };
}

function xmlToJsonifiedXML(xml: string) {
  return parser.parse(xml)[0];
}

function jsonifiedXMLToEditorData(data: any): SlamEditorElement {
  let elementName: string = "";

  for (let key in data) {
    if (key !== ":@") {
      elementName = key;
    }
  }

  let attributes: SlamEditorAttribute[] = [];

  if (data[":@"] != null) {
    for (let key in data[":@"]) {
      attributes.push({
        name: key,
        value: data[":@"][key],
      });
    }
  }

  return {
    name: elementName,
    id: getId(),
    attributes: attributes,
    elements:
      data[elementName] != null
        ? data[elementName].map(jsonifiedXMLToEditorData)
        : [],
  };
}

function editorDataToDefinition(
  data: SlamEditorElement
): SlamElementDefinition {
  const def: SlamElementDefinition = {
    name: data.name,
    attributes: data.attributes?.map(editorAttributeToDefinition),
    elements: Array.isArray(data.elements)
      ? data.elements.map(editorDataToDefinition)
      : undefined,
  };

  if (
    Array.isArray(data.elements) &&
    new Set(data.elements.map((e) => e.name)).size > data.elements.length
  ) {
    def.type = "listing";
  }

  return def;
}

function editorAttributeToDefinition(
  data: SlamEditorAttribute
): SlamAttributeDefinition {
  return {
    name: data.name,
    type:
      typeof data.value === "number"
        ? "number"
        : typeof data.value === "boolean"
        ? "boolean"
        : "string",
  };
}

export function jsonifiedXMLToXML(root: any) {
  return builder.build(root);
}
