import { JsonifiedXML } from "./jsonifiedXml";
import { SlamElement } from "./slam";

export class SlamElementManager {
  private element: SlamElement;

  public constructor(element: SlamElement) {
    this.element = element;
  }

  public toJsonifiedXML(): JsonifiedXML {
    return { [this.element.name]: [] };
  }
}
