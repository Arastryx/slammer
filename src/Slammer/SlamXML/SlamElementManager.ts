import { SlamElement } from "./slam";

export class SlamElementManager {
  private element: SlamElement;

  public constructor(element: SlamElement) {
    this.element = element;
  }

  public toJsonifiedXML(): any {
    return {
      [this.element.name]: [],
      ":@": Object.fromEntries(
        (this.element.attributes ?? []).map((a) => [a.name, 52])
      ),
    };
  }
}
