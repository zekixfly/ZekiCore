// src/dom.js

/**
 * 
 * @param {*} selector 
 * @returns 
 */
export function $(selector) {
  return document.querySelector(selector);
}

/**
 * 
 * @param {*} selector 
 * @returns 
 */
export function $$(selector) {
  return document.querySelectorAll(selector);
}

/**
 * get element by id.
 * @param {string} id - 元素 ID
 * @returns {HTMLElement} - 對應的 DOM 元素
 */
export function getId(id) {
  return document.getElementById(id);
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
 * @param {string} tags - 標籤名稱
 * @returns {HTMLCollection} - 對應的 DOM 元素集合
 */
export function getTags(tags) {
  return document.getElementsByTagName(tags);
}
