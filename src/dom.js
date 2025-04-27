// src/dom.js

import { ZekiElement } from './dom-ext.js';

/**
 * get element by selector.
 * @param {string} selector - CSS 選擇器
 * @returns {HTMLElement} - 對應的 DOM 元素
 */
export function one(selector) {
  const el = document.querySelector(selector);
  return el ? new ZekiElement(el): null;
}

/**
 * get elements by selector.
 * @param {string} selector - CSS 選擇器
 * @returns {NodeList} - 對應的 DOM 元素集合
 */
export function all(selector) {
  return document.querySelectorAll(selector);
}

/**
 * get element by id.
 * @param {string} id - 元素 ID
 * @returns {HTMLElement} - 對應的 DOM 元素
 */
export function getId(id) {
  const el = document.getElementById(id);
  return el ? new ZekiElement(el): null;
}

/**
 * get elements by id array.
 * @param {Array} arr - 元素 ID 陣列
 * @returns {Array} - 對應的 DOM 元素陣列
 */
export function getIds(arr) {
  let stack = [];
  for(var i=0; i<arr.length; i++) {
    stack.push(document.getElementById(arr[i]));
  }
  return stack;
}

/**
 * get elements by tag name.
 * @param {string} tagName - 元素名稱
 * @returns {HTMLCollection} - 對應的 DOM 元素集合
 */
export function getTag(tagName) {
  return document.getElementsByTagName(tagName);
}

/**
 * get elements by class name.
 * @param {*} className - 類別名稱
 * @returns {HTMLCollection} - 對應的 DOM 元素集合
 */
export function getClass(className) {
  return document.getElementsByClassName(className);
}

/**
 * create elements by tag name.
 * @param {string} tagName - 元素名稱
 * @returns {NodeList} - 對應的 DOM 元素集合
 */
export function makeTag(tagName) {
  return document.createElement(tagName);
}

/**
 * create text node.
 * @param {string} textContnet - 文字內容
 * @returns {Text} - 對應的 DOM 文字節點
 */
export function makeText(textContnet) {
  return document.createTextNode(textContnet);
}