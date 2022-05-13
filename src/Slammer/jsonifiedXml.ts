interface AttributedItem {
  ":@": { [value: string]: string | number | boolean };
}

export type JsonifiedXML = AttributedItem & {
  [elementName: string]: JsonifiedXML[];
};
