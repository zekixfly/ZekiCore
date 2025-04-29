// src/dom-create.js

import { ZekiElement } from "./element.js";

/**
 * create elements by tag name.
 * @param {string} tagName - 元素名稱
 * @returns {HTMLElement} - 對應的 DOM 元素
 */
export function makeTag(tagName) {
  return new ZekiElement(document.createElement(tagName));
}

/**
 * create text node.
 * @param {string} textContnet - 文字內容
 * @returns {Text} - 對應的 DOM 文字節點
 */
export function makeText(textContnet) {
  return document.createTextNode(textContnet);
}
