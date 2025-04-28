// src/dom-select.js

import { ZekiElement } from "./dom-manipulate.js";

/**
 * get element by selector.
 * @param {string} selector - CSS 選擇器
 * @returns {HTMLElement} - 對應的 DOM 元素
 */
export function one(selector) {
  const el = document.querySelector(selector);
  return el ? new ZekiElement(el) : null;
}

/**
 * get elements by selector.
 * @param {string} selector - CSS 選擇器
 * @returns {NodeList} - 對應的 DOM 元素集合
 */
export function all(selector) {
  return Array.from(document.querySelectorAll(selector)).map(
    (el) => new ZekiElement(el)
  );
}

/**
 * get element by id.
 * @param {string} id - 元素 ID
 * @returns {HTMLElement} - 對應的 DOM 元素
 */
export function getId(id) {
  const el = document.getElementById(id);
  return el ? new ZekiElement(el) : null;
}

/**
 * get elements by id array.
 * @param {Array} arr - 元素 ID 陣列
 * @returns {Array} - 對應的 DOM 元素陣列
 */
export function getIds(arr) {
  return arr.filter((id) => {
    const el = getId(id);
    if (el) {
      return new ZekiElement(el);
    } else {
      console.warn(`getIds: ${id} is not exist`);
      return null;
    }
  });
}

/**
 * get elements by tag name.
 * @param {string} tagName - 元素名稱
 * @returns {HTMLCollection} - 對應的 DOM 元素集合
 */
export function getTag(tagName) {
  return Array.from(document.getElementsByTagName(tagName)).map(
    (el) => new ZekiElement(el)
  );
}

/**
 * get elements by class name.
 * @param {*} className - 類別名稱
 * @returns {HTMLCollection} - 對應的 DOM 元素集合
 */
export function getClass(className) {
  return Array.from(document.getElementsByClassName(className)).map(
    (el) => new ZekiElement(el)
  );
}
