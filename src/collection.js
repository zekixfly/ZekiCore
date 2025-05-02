// src/collection.js
import { ZekiElement } from "./element.js";
export class ZekiCollection extends Array {
  constructor(elements = []) {
    super(); // 呼叫父類別的建構子
    for (let i = 0; i < elements.length; i++) {
      this[i] = elements[i];
    }
  }
}

function addClass(className) {
  this.forEach((item) => 
  (item instanceof ZekiElement)
      ? item.el.classList.add(className)
      : item.classList.add(className)
  );
  return this; // 支援鏈式呼叫
}

function delClass(className) {
  this.forEach((item) =>
    (item instanceof ZekiElement)
      ? item.el.classList.remove(className)
      : item.classList.remove(className)
  );
  return this; // 支援鏈式呼叫
}

function siblings() {
  const siblings = [];
  const elements = this.map(item => item.el); // 取得 DOM 元素

  for (let i = 0; i < elements.length; i++) {

    // 處理前面的兄弟元素
    let p = elements[i].previousSibling;
    while (p) {
      if (p.nodeType === 1 && !elements.includes(p)) siblings.push(new ZekiElement(p));
      p = p.previousSibling;
    }

    // 處理後面的兄弟元素
    let n = elements[i].nextSibling;
    while (n) {
      if (n.nodeType === 1 && !elements.includes(n)) siblings.push(new ZekiElement(n));
      n = n.nextSibling;
    }
  }

  // 依據原始 DOM 結構順序排序
  siblings.sort((a, b) => {
    if (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_PRECEDING) {
      return 1;
    } else {
      return -1;
    }
  });

  return new ZekiCollection(siblings);
}

function length() {
  return this.length;
}

function values() {
  let index = 0;
  const self = this;
  return {
    next() {
      return index < self.length
        ? { value: self[index++], done: false }
        : { value: undefined, done: true };
    },
  };
}

Object.defineProperties(ZekiCollection.prototype, {
  addClass: {
    value: addClass,
    writable: true,
    enumerable: true,
    configurable: false,
  },
  delClass: {
    value: delClass,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  siblings: {
    value: siblings,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  length: {
    get: length,
    enumerable: true,
    configurable: false,
  },
  [Symbol.iterator]: {
    value: values,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  [Symbol.toStringTag]: {
    value: "ZekiCollection",
    enumerable: false,
    writable: false,
    configurable: false,
  },
});
