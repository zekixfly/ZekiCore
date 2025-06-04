import { ZekiElement, ZekiCollection } from "./core/core.js";

export class ZekiFragment {
  constructor(element) {
    this.el = element;
    this.elContent = element.content;
  }

  add(...paramN) {
    paramN = paramN.map(child => {
        if (child instanceof ZekiElement) {
            return child.el;
        } else if (child instanceof ZekiCollection) {
            return child.map(el => el.el);
        } else if (child instanceof HTMLElement) {
            return child;
        } else {
            console.warn("ZekiFragment.add: paramN is not ZekiElement or HTMLElement");
            return null;
        }
    }
    ).filter(el => el !== null);
    this.elContent.append(...paramN);
    return this;
  }

  preAdd(...paramN) {
    paramN = paramN.map(child => {
        if (child instanceof ZekiElement) {
            return child.el;
        } else if (child instanceof ZekiCollection) {
            return child.map(el => el.el);
        } else if (child instanceof HTMLElement) {
            return child;
        } else {
            console.warn("ZekiFragment.preadd: paramN is not ZekiElement or HTMLElement");
            return null;
        }
    }
    ).filter(el => el !== null);
    this.elContent.prepend(...paramN);
    return this;
  }

  one(selector) {
    const el = this.elContent.querySelector(selector);
    return el ? new ZekiElement(el) : null;
  }

  all(selector) {
    const nodeList = this.elContent.querySelectorAll(selector);
    const elements = Array.from(nodeList, el => new ZekiElement(el));
    return new ZekiCollection(elements);
  }

  moveBefore(movedNode, referenceNode) {
    (movedNode instanceof ZekiElement) && (movedNode = movedNode.el);
    (referenceNode instanceof ZekiElement) && (referenceNode = referenceNode.el);
    this.elContent.moveBefore(movedNode, referenceNode);
    return this;
  }

  replaceKids(...paramN) {
    paramN = paramN.map(child => {
        if (child instanceof ZekiElement) {
            return child.el;
        } else if (child instanceof ZekiCollection) {
            return child.map(el => el.el);
        } else if (child instanceof HTMLElement) {
            return child;
        } else {
            console.warn("ZekiFragment.replace: paramN is not ZekiElement or HTMLElement");
            return null;
        }
    }
    ).filter(el => el !== null);
    this.elContent.replaceChildren(...paramN);
    return this;
  }

  getId(id) {
    const el = this.elContent.getElementById(id);
    return el ? new ZekiElement(el) : null;
  }

  /**
   * 獲取元素的 innerHTML
   * @returns {string} - 返回當前元素的 innerHTML
   */
  get html() {
    return this.el.innerHTML;
  }

  /**
   * 設置元素的 innerHTML
   * @param {string} html - 要設置的 HTML 內容
   * @returns {ZekiFragment} - 返回當前的 ZekiFragment 實例
   */
  set html(html) {
    this.el.innerHTML = html;
    return this;
  }

  get kidCount() {
    return this.elContent.childElementCount;
  }

  get kids() {
    const htmlCollection = this.elContent.children;
    const elements = Array.from(htmlCollection, el => new ZekiElement(el));
    return new ZekiCollection(elements);
  }

  get firstKid() {
    return new ZekiElement(this.elContent.firstElementChild);
  }

  get lastKid() {
    return new ZekiElement(this.elContent.lastElementChild);
  }
}
