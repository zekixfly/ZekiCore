// src/collection.js
import { ZekiElement, ZekiCollection } from "./core.js";

/** 
 * 設置 DOM 元素的 attribute
 * @param {string} key - DOM 元素屬性名稱
 * @param {string} val - DOM 元素屬性值
 * @returns {ZekiCollection} - 返回當前的 ZekiCollection 實例
 */
export function setAttr(key, val) {
  this.forEach(item =>
    item instanceof ZekiElement
      ? item.el.setAttribute(key, val)
      : item.setAttribute(key, val)
  );
  return this; // 支援鏈式呼叫
}

/**
 * 刪除 DOM 元素裡的 attribute 
 * @param {string} key - DOM 元素屬性名稱
 * @returns {ZekiCollection} - 返回當前的 ZekiCollection 實例
 */
export function delAttr(key) {
  this.forEach(item =>
    item instanceof ZekiElement
      ? item.el.removeAttribute(key)
      : item.removeAttribute(key)
  );
  return this; // 支援鏈式呼叫
}

/**
 * 新增 class 名稱到 DOM 元素
 * @param {string} className - 要新增的 class 名稱
 * @returns {ZekiCollection} - 返回當前的 ZekiCollection 實例
 */
export function addClass(className) {
  this.forEach(item =>
    item instanceof ZekiElement
      ? item.el.classList.add(className)
      : item.classList.add(className)
  );
  return this; // 支援鏈式呼叫
}

/**
 * 刪除 DOM 元素的 class 名稱
 * @param {string} className - 要刪除的 class 名稱
 * @returns {ZekiCollection} - 返回當前的 ZekiCollection 實例
 */
export function delClass(className) {
  this.forEach(item =>
    item instanceof ZekiElement
      ? item.el.classList.remove(className)
      : item.classList.remove(className)
  );
  return this; // 支援鏈式呼叫
}

/**
 * batch append Child
 * @param {*} child - DOM 元素或 ZekiElement 實例
 * @returns {ZekiCollection} - 返回當前的 ZekiCollection 實例
 */
export function addKid(child) {
  child instanceof ZekiElement && (child = child.el);
  this.forEach(item => {
    let deepCloneNode = child.cloneNode(true);
    item instanceof ZekiElement
      ? item.el.appendChild(deepCloneNode)
      : item.appendChild(deepCloneNode)
  });
  return this; // 支援鏈式呼叫
}

/**
 * remove elements
 * @param {*} child - DOM 元素或 ZekiElement 實例
 * @returns {ZekiCollection} - 返回當前的 ZekiCollection 實例
 */
export function remove() {
  this.forEach(item => {
    item instanceof ZekiElement
      ? item.el.remove()
      : item.remove()
  });
  return this; // 支援鏈式呼叫
}

/**
 * 取得當前類陣列元素的兄弟元素集合
 * @returns {ZekiCollection} - 返回當前類陣列元素之外的兄弟元素集合
 * @example const siblings = getIds('id1', 'id2').siblings(); // 取得除了 id1 和 id2 以外的兄弟元素集合
 * @example getIds('id1', 'id2').siblings().delClass('style1').addClass('style2'); // 將取得的兄弟元素們刪除 style1 類名並添加 style2 類名
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
 * 增加事件監聽器
 * @param {string} eventType - 事件類型
 * @param {function} handler - 事件處理函數
 * @param {boolean} options - 是否使用捕獲模式
 * @returns {ZekiCollection} - 返回當前的 ZekiCollection 實例
 */
export function on(eventType, handler, options = false) {
  if (typeof handler !== "function") return;
  this.forEach(item => {
    item instanceof ZekiElement
      ? item.el.addEventListener(eventType, handler, options)
      : item.addEventListener(eventType, handler, options)
  });
  return this; // 支援鏈式呼叫
}

/**
 * 移除事件監聽器
 * @param {string} eventType - 事件類型
 * @param {function} handler - 事件處理函數
 * @returns {ZekiCollection} - 返回當前的 ZekiCollection 實例
 */
export function off(eventType, handler) {
  if (typeof handler !== "function") return;
  this.forEach(item => {
    item instanceof ZekiElement
      ? item.el.removeEventListener(eventType, handler)
      : item.removeEventListener(eventType, handler)
  });
  return this; // 支援鏈式呼叫
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
