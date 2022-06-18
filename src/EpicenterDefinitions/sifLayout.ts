import { SlamElementDefinition } from "../Slammer/SlamXML/slam";

const slots: SlamElementDefinition[] = [];

const horizontalLayout: SlamElementDefinition = {
  name: "HorizontalLayout",
  elements: slots,
  type: "listing",
};

const verticalLayout: SlamElementDefinition = {
  name: "VerticalLayout",
  elements: slots,
  type: "listing",
};

const button: SlamElementDefinition = {
  name: "Button",
  elements: slots,
  type: "slot",
};

const text: SlamElementDefinition = {
  name: "Text",
  attributes: [{ name: "font", type: "string" }],
  type: "text",
};

slots.push(horizontalLayout);
slots.push(verticalLayout);
slots.push(button);
slots.push(text);

export const sifLayout: SlamElementDefinition = {
  name: "SifLayout",
  elements: slots,
  type: "slot",
};
