// src/dom-select.js
import { ZekiElement } from "./element.js";
import { ZekiCollection } from './core.js';

/**
  * 將 DOM 元素轉換為 ZekiElement 實例
  * @param {HTMLElement} el - 要轉換的 DOM 元素
  * @returns {ZekiElement|null} - 返回 ZekiElement 實例或 null
  * @example
  * const zekiEl = toZeki(document.querySelector('#myElement'));
  * console.log(zekiEl instanceof ZekiElement); // true
  */
export function toZeki(el) {
  if (el instanceof ZekiElement) return el; // 如果已經是 ZekiElement，則直接返回
  if (el instanceof Document) return new ZekiElement(el.documentElement); // 如果是 Document，則包裝成 ZekiElement 實例
  if (el instanceof HTMLElement) return new ZekiElement(el); // 如果是 HTMLElement，則包裝成 ZekiElement
  return null; // 否則返回 null
}

/**
 * get element by selector.
 * @param {string} selector - CSS 選擇器
 * @returns {ZekiElement} - 對應的 DOM 元素
 */
export function one(selector) {
  const el = document.querySelector(selector);
  return el ? new ZekiElement(el) : null;
}

/**
 * get elements by selector.
 * @param {string} selector - CSS 選擇器
 * @returns {ZekiCollection} - 對應的 DOM 元素集合
 */
export function all(selector) {
  const nodeList = document.querySelectorAll(selector);
  const elements = Array.from(nodeList, el => new ZekiElement(el));
  return new ZekiCollection(elements);
}

/**
 * get element by id.
 * @param {string} id - 元素 ID
 * @returns {ZekiElement} - 對應的 DOM 元素
 */
export function getId(id) {
  const el = document.getElementById(id);
  return el ? new ZekiElement(el) : null;
}

/**
 * get elements by id array.
 * @param {Array} arr - 元素 ID 陣列
 * @returns {ZekiCollection} - 對應的 DOM 元素集合
 */
export function getIds(...ids) {
   const elements = ids.map((id) => {
    const el = document.getElementById(id);
    if (el) {
      return new ZekiElement(el);
    } else {
      console.warn(`getIds: ${id} is not exist`);
      return null;
    }
  }).filter((el) => el !== null);
  return new ZekiCollection(elements);
}

/**
 * get elements by tag name.
 * @param {string} tagName - 元素名稱
 * @returns {ZekiCollection} - 對應的 DOM 元素集合
 */
export function getTag(tagName) {
  const htmlCollection = document.getElementsByTagName(tagName);
  const elements = Array.from(htmlCollection, el => new ZekiElement(el));
  return new ZekiCollection(elements);
}

/**
 * get elements by class name.
 * @param {string} className - 類別名稱
 * @returns {ZekiCollection} - 對應的 DOM 元素集合
 */
export function getClass(className) {
  const htmlCollection = document.getElementsByClassName(className);
  const elements = Array.from(htmlCollection, el => new ZekiElement(el));
  return new ZekiCollection(elements);
}
