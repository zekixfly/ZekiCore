// src/collection.js
import { ZekiElement } from "./element.js";
import { ZekiCollection } from "./core.js";

/**
 * 新增 class 名稱到 DOM 元素
 * @param {string} className - 要新增的 class 名稱
 * @returns {ZekiCollection} - 對應的 DOM 元素集合
 */
export function addClass(className) {
  this.forEach((item) =>
    item instanceof ZekiElement
      ? item.el.classList.add(className)
      : item.classList.add(className)
  );
  return this; // 支援鏈式呼叫
}

/**
 * 刪除 DOM 元素的 class 名稱
 * @param {string} className - 要刪除的 class 名稱
 * @returns {ZekiCollection} - 對應的 DOM 元素集合
 */
export function delClass(className) {
  this.forEach((item) =>
    item instanceof ZekiElement
      ? item.el.classList.remove(className)
      : item.classList.remove(className)
  );
  return this; // 支援鏈式呼叫
}

/**
 * 取得當前類陣列的兄弟元素集合
 * @returns {ZekiCollection} - 返回當前類陣列元素之外的兄弟元素集合
 */
export function siblings() {
  const siblings = [];
  const elements = this.map((item) => item.el); // 取得 DOM 元素

  for (let i = 0; i < elements.length; i++) {
    // 處理前面的兄弟元素
    let p = elements[i].previousSibling;
    while (p) {
      if (p.nodeType === 1 && !elements.includes(p))
        siblings.push(new ZekiElement(p));
      p = p.previousSibling;
    }

    // 處理後面的兄弟元素
    let n = elements[i].nextSibling;
    while (n) {
      if (n.nodeType === 1 && !elements.includes(n))
        siblings.push(new ZekiElement(n));
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

/**
 * 取得當前類陣列的長度
 * @returns {number} - 返回當前類陣列的長度
 */
export function length() {
  return this.length;
}

/**
 * 取得當前類陣列的迭代器
 * @returns {object} - 返回當前類陣列的迭代器
 */
export function values() {
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
