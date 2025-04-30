// src/collection.js
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
    item.hasOwnProperty("el")
      ? item.el.classList.add(className)
      : item.classList.add(className)
  );
  return this; // 支援鏈式呼叫
}

function delClass(className) {
  this.forEach((item) =>
    item.hasOwnProperty("el")
      ? item.el.classList.remove(className)
      : item.classList.remove(className)
  );
  return this; // 支援鏈式呼叫
}

function siblings() {
  const resultSet = new Set();

  for (let i = 0; i < this.length; i++) {
    const el = this[i].el; // 取得 DOM 元素

    // 處理前面的兄弟元素
    let prev = el.previousSibling;
    while (prev) {
      if (prev.nodeType === 1 && !this.includes(prev)) {
        resultSet.add(prev);
      }
      prev = prev.previousSibling;
    }

    // 處理後面的兄弟元素
    let next = el.nextSibling;
    while (next) {
      if (next.nodeType === 1 && !this.includes(next)) {
        resultSet.add(next);
      }
      next = next.nextSibling;
    }
  }

  // 轉回 array，依據原始 DOM 結構順序排序
  const allSiblings = Array.from(resultSet);
  allSiblings.sort((a, b) => {
    if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING) {
      return 1;
    } else {
      return -1;
    }
  });

  return new ZekiCollection(allSiblings);
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
